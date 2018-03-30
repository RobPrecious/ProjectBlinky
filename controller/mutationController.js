const path = require('path');
const fs = require('fs-extra');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const mutator = require('./mutator');
const mutationLibrary = require('../controller/mutationLibrary');
const axeController = require('../controller/axeController');
const validityController = require('../controller/validityController');


const mutationController = {
  checkSource: (source, source_id) => {
    return Promise.all([
        mutationController.mutantViabilityCheck(source),
        axeController.testURL("http://127.0.0.1:3000/v2/source"),
        validityController.validityCheckSource(source),
        axeController.runPa11y("http://127.0.0.1:3000/v2/source"),
      ])
      .then(results => {
        return {
          "source": {
            "id": source_id,
            "file": path.resolve(__dirname, '../views/' + source),
            "route": "/v2/source",
          },
          "mutations": {
            "mutantCount": mutationLibrary.length,
            "viableCount": results[0][0].length,
            "viableRaw": results[0][0],
            "nonViableCount": results[0][1].length,
            "nonViableRaw": results[0][1],
          },
          "axe": {
            "violationsCount": results[1].violations.length,
            "raw": results[1].violations,
          },
          "validity": {
            "valid": results[2].messages ? false : true,
            "raw": results[2],
          },

        }
      })
      .catch(err => {
        console.log(err);
      })
  },

  mutantViabilityCheck: (location) => {
    return JSDOM.fromFile(path.resolve(__dirname, "../views/" + location))
      .then(dom => {
        return [mutationLibrary.filter(mutation => mutation.check(dom)), mutationLibrary.filter(mutation => !mutation.check(dom))];
      })
  },






  mutateSource: (source, mutationLibrary) => {
    return new Promise((res, rej) => {
      let source_data = {
        id: source.id,
        file: source.file,
        route: source.route,
        mutants: []
      }
      mutationController.getMutations(source, mutationLibrary)
        .then(mutations => {
          return mutator(source, mutations)
            .then(result => source_data.mutants = result);
        }).then((result) => {
          res(source_data);
        });
    });
  },

  getSources: () => {
    const files = fs.readdirSync(path.resolve(__dirname, '../views/sources'));
    let output = [];
    for (let i in files) {
      output.push({
        id: files[i].split('.')[0],
        route: 'sources/' + files[i].split('.')[0],
        file: path.resolve(__dirname, '../views/sources/' + files[i])
      })
    }

    return output;
  },

  getMutations: (source, availableMutants) => {
    return JSDOM.fromFile(source.file)
      .then(dom => {
        return availableMutants.filter(mutation => mutation.check(dom))
      })
      .catch(err => {
        console.log(err);
      })
  },

  getMutationPromises: (availableMutants) => {
    return mutationController.getSources().map((source, index) => {
      return new Promise((res, rej) => {
        let source_data = {
          id: source.id,
          file: source.file,
          route: source.route,
          mutants: []
        }
        mutationController.getMutations(source, availableMutants)
          .then(mutations => {
            return mutator(source, mutations)
              .then(result => source_data.mutants = result);
          }).then((result) => {
            res(source_data);
          });
      });
    });
  },

  analyseSaved: (savedData) => {
    try {
      console.log("Count", savedData.mutants.length);
      savedData.mutants.map(mutant => {
        live

      })
      return savedData
    } catch (err) {
      console.log(err);
    }
  },

  postToolAnalysis: (source) => {
    return new Promise((resolve, reject) => {
        //Establish whether mutants killed, equiv or live
        source.mutants = source.mutants.map(mutant => {
          mutant.live = mutant.axe.violations.length == source.axe.violations.length ? true : false;
          mutant.equiv = mutant.thisHTML == mutant.sourceHTML ? true : false;
          mutant.killed = !mutant.live;
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
              total: 0,
              violations: 0,
              live: 0,
              killed: 0,
            });

          }
          mutation.total = 0;
          mutation.violations = 0;
          mutation.live = 0;
          mutation.killed = 0;


          source.mutants.map(mutant => {
            if (mutant.mutation.id == mutation.id) {
              mutation.violations += mutant.axe.violations.length;
              mutation.live += mutant.live ? 1 : 0;
              mutation.killed += mutant.killed ? 1 : 0;
              mutation.total++;
            }
          });

          return mutation;
        });

        // Compile Analysis
        let all = {
          total: 0,
          violations: 0,
          live: 0,
          killed: 0,
        };

        source.mutations.map(mut => {
          all.violations += mut.violations;
          all.live += mut.live;
          all.killed += mut.killed;
          all.total++;

          let mut_class = categories_obj.find(cat => cat.name == mut.class);
          mut_class.violations += mut.violations;
          mut_class.live += mut.live;
          mut_class.killed += mut.killed;
          mut_class.total++;
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

module.exports = mutationController;