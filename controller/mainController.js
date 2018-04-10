const path = require('path');
const fs = require('fs-extra');

const mutationController = require('../controller/mutationController');
const validityController = require('../controller/validityController');
const toolController = require('../controller/toolController');

const mutationLibrary = require('../mutantOperators/mutationLibrary');


const mainController = {
  checkSource: (source, source_id, url) => {
    return Promise.all([
        mutationController.mutantViabilityCheck(source),
        validityController.validityCheckFromFile(source),
        toolController.axeTools.testURL("http://127.0.0.1:3000" + url),
      ])
      .then(results => {
        return {
          "id": source_id,
          "file": path.resolve(__dirname, '../views/' + source),
          "route": url,

          "mutations": {
            "mutantCount": mutationLibrary.length,
            "viableCount": results[0][0].length,
            "viableRaw": results[0][0],
            "nonViableCount": results[0][1].length,
            "nonViableRaw": results[0][1],
          },
          "ATTResults": {
            "axe": {
              "violationsCount": results[2].violations.length,
              "raw": results[2].violations,
            },
          },
          "validity": results[1],
        }
      })
      .catch(err => {
        console.log(err);
      })
  },

  postToolAnalysis: (source) => {
    return new Promise((resolve, reject) => {
        //Establish whether mutants killed, equiv or live
        source.mutants = source.mutants.map(mutant => {
          let current = mutant.ATTResults.axe;
          current.live = current.violationsCount == source.ATTResults.axe.violationsCount ? true : false;
          current.equiv = mutant.thisHTML == mutant.sourceHTML ? true : false;
          current.killed = !current.live;

          return mutant;
        })
        resolve(source);
      })
      .then(source => {
        // Compile Mutation Data
        let classes_list = [];
        let sub_classes_list = [];
        let classes_obj = [];
        let sub_classes_obj = [];

        const mutationAnalysis = mutationLibrary.map(mutation => {
          if (classes_list.indexOf(mutation.class) == -1) {
            classes_list.push(mutation.class);
            classes_obj.push({
              name: mutation.class,
              "axe": {
                total: 0,
                violations: 0,
                live: 0,
                killed: 0,
              },
            });

          }
          if (sub_classes_list.indexOf(mutation.subclass) == -1) {
            sub_classes_list.push(mutation.subclass);
            sub_classes_obj.push({
              name: mutation.subclass,
              parent: mutation.class,
              "axe": {
                total: 0,
                violations: 0,
                live: 0,
                killed: 0,
              },
            });

          }

          mutation.analysis = {
            "axe": {
              total: 0,
              violations: 0,
              live: 0,
              killed: 0,
            },
          }

          source.mutants.map(mutant => {
            if (mutant.mutation.id == mutation.id) {

              const currentMutation = mutation.analysis.axe;
              const currentMutant = mutant.ATTResults.axe;

              currentMutation.violations += currentMutant.violationsCount;
              currentMutation.live += currentMutant.live ? 1 : 0;
              currentMutation.killed += currentMutant.killed ? 1 : 0;
              currentMutation.total++;

            }
          });

          return mutation;
        });

        // Compile Analysis
        let all = {
          "axe": {
            total: 0,
            violations: 0,
            live: 0,
            killed: 0,
          },
        };

        mutationAnalysis.map(mut => {
          let mut_class = classes_obj.find(cat => cat.name == mut.class);
          let mut_subclass = sub_classes_obj.find(sub => sub.name == mut.subclass);
          const currentAll = all.axe;
          const currentMutationClass = mut_class.axe;
          const currentMutationSubClass = mut_subclass.axe;
          const currentMutation = mut.analysis.axe

          currentAll.violations += currentMutation.violations;
          currentAll.live += currentMutation.live;
          currentAll.killed += currentMutation.killed;
          currentAll.total++;

          currentMutationClass.violations += currentMutation.violations;
          currentMutationClass.live += currentMutation.live;
          currentMutationClass.killed += currentMutation.killed;
          currentMutationClass.total++;

          currentMutationSubClass.violations += currentMutation.violations;
          currentMutationSubClass.live += currentMutation.live;
          currentMutationSubClass.killed += currentMutation.killed;
          currentMutationSubClass.total++;

        })

        return {
          source,
          "analysis": {
            all,
            mutationAnalysis,
            "classes": classes_obj,
            "subClasses": sub_classes_obj,
          }
        }

      })
  }

}

module.exports = mainController;