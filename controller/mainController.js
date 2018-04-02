const path = require('path');
const fs = require('fs-extra');

const mutationController = require('../controller/mutationController');
const validityController = require('../controller/validityController');
const toolController = require('../controller/toolController');

const mutationLibrary = require('../controller/mutationLibrary');


const mainController = {
  checkSource: (source, source_id) => {
    return Promise.all([
        mutationController.mutantViabilityCheck(source),
        validityController.validityCheckFromFile(source),
        toolController.axeTools.testURL("http://127.0.0.1:3000/v2/source"),
      ])
      .then(results => {
        return {
          "id": source_id,
          "file": path.resolve(__dirname, '../views/' + source),
          "route": "/v2/source",

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
        let categories_list = [];
        let categories_obj = [];

        const mutationAnalysis = mutationLibrary.map(mutation => {
          if (categories_list.indexOf(mutation.class) == -1) {
            categories_list.push(mutation.class);
            categories_obj.push({
              name: mutation.class,
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
          let mut_class = categories_obj.find(cat => cat.name == mut.class);
          const currentAll = all.axe;
          const currentMutationClass = mut_class.axe;
          const currentMutation = mut.analysis.axe

          currentAll.violations += currentMutation.violations;
          currentAll.live += currentMutation.live;
          currentAll.killed += currentMutation.killed;
          currentAll.total++;

          currentMutationClass.violations += currentMutation.violations;
          currentMutationClass.live += currentMutation.live;
          currentMutationClass.killed += currentMutation.killed;
          currentMutationClass.total++;

        })

        return {
          source,
          "analysis": {
            all,
            mutationAnalysis,
            "categories": categories_obj,
          }
        }

      })
  }

}

module.exports = mainController;