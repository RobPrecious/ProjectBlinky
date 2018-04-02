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
        toolController.pa11yTools.testURL("http://127.0.0.1:3000/v2/source"),
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
            "pa11y": {
              "violationsCount": results[3].issues.length,
              "raw": results[3].issues,
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
    const tools = ["axe", "pa11y"];
    return new Promise((resolve, reject) => {
        //Establish whether mutants killed, equiv or live
        source.mutants = source.mutants.map(mutant => {
          for (t in tools) {
            mutant.ATTResults[tools[t]].live = mutant.ATTResults[tools[t]].violationsCount == source.ATTResults[tools[t]].violationsCount ? true : false;
            mutant.ATTResults[tools[t]].equiv = mutant.thisHTML == mutant.sourceHTML ? true : false;
            mutant.ATTResults[tools[t]].killed = !mutant.ATTResults[tools[t]].live;
          }
          return mutant;
        })
        resolve(source);
      })
      .then(source => {
        // Compile Mutation Data
        let categories_list = [];
        let categories_obj = [];

        source.mutations = mutationLibrary.map(mutation => {
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
              "pa11y": {
                total: 0,
                violations: 0,
                live: 0,
                killed: 0,
              }
            });

          }


          mutation.analysis = {
            "axe": {
              total: 0,
              violations: 0,
              live: 0,
              killed: 0,
            },
            "pa11y": {
              total: 0,
              violations: 0,
              live: 0,
              killed: 0,
            }
          }

          source.mutants.map(mutant => {
            if (mutant.mutation.id == mutation.id) {
              for (t in tools) {
                mutation.analysis[tools[t]].violations += mutant.ATTResults[tools[t]].violationsCount;
                mutation.analysis[tools[t]].live += mutant.ATTResults[tools[t]].live ? 1 : 0;
                mutation.analysis[tools[t]].killed += mutant.ATTResults[tools[t]].killed ? 1 : 0;
                mutation.analysis[tools[t]].total++;
              }
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
          "pa11y": {
            total: 0,
            violations: 0,
            live: 0,
            killed: 0,
          }
        };

        source.mutations.map(mut => {
          let mut_class = categories_obj.find(cat => cat.name == mut.class);
          for (t in tools) {
            all[tools[t]].violations += mut.analysis[tools[t]].violations;
            all[tools[t]].live += mut.analysis[tools[t]].live;
            all[tools[t]].killed += mut.analysis[tools[t]].killed;
            all[tools[t]].total++;

            mut_class[tools[t]].violations += mut.analysis[tools[t]].violations;
            mut_class[tools[t]].live += mut.analysis[tools[t]].live;
            mut_class[tools[t]].killed += mut.analysis[tools[t]].killed;
            mut_class[tools[t]].total++;
          }
        })

        return {
          source,
          "analysis": {
            all,
            "categories": categories_obj,
          }
        }

      })
  }

}

module.exports = mainController;