const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs-extra');

const mutationController = require('../controller/mutationController');
const axeController = require('../controller/axeController');
const mutationLibrary = require('../controller/mutationLibrary');

const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const url = "http://localhost:3000";
let ran = false;
let running = false;

function createRoutes(data) {
  data.sources.map(source => {
    router.get('/sources/' + source.id, (req, res, next) => {
      res.render('main', {
        template: source.file
      });
    });
    source.mutants.map(mutant => {
      router.get('/mutants/' + mutant.id, (req, res, next) => {
        res.render('main', {
          template: mutant.file
        });
      });
    })
  })
  return data;
}

function run() {
  //Create mutants
  return Promise.all(mutationController.getMutationPromises(
      mutationLibrary.filter(mut => {
        return true; //mut.successCriteria == "1.3.2"
      })
    ))
    .then(results => {
      return {
        sources: results
      };
    })
    // Create Routes for Mutants
    .then(data => createRoutes(data))
    //Test Mutants with Axe
    .then(data => {
      return Promise.all(data.sources.map(source => {
          return axeController.testURL(url + "/" + source.route).then(result => {
              source.axe = {
                violations: result.violations
              };
            })
            .then(() => {
              return Promise.all(source.mutants.map(mutant => {
                return axeController.testURL(url + mutant.route).then(result => {
                  mutant.axe = {
                    violations: result.violations
                  };
                })
              }));
            })
        }))
        .then(() => {
          return data;
        })
    })
    //Analyse and Export Results
    .then(results => {
      let data = {
        sources: results.sources
      };
      let categories_list = [];
      let categories_obj = [];

      data.sources.map(source => {
        source.mutants.map(mutant => {
          mutant.live = mutant.axe.violations.length == source.axe.violations.length ? true : false;
          mutant.equiv = mutant.thisHTML == mutant.sourceHTML ? true : false;
        })
      });

      // Compile Mutation Data
      data.mutations = mutationLibrary.map(mutation => {
        if (categories_list.indexOf(mutation.class) == -1) {
          categories_list.push(mutation.class);
          categories_obj.push({
            name: mutation.class,
            violations: 0,
            live: 0,
            total: 0,

          });
        }
        mutation.total = 0;
        mutation.violations = 0;
        mutation.live = 0;

        data.sources.map(source => {
          source.mutants.map(mutant => {
            if (mutant.mutation.id == mutation.id) {
              mutation.violations += mutant.axe.violations.length;
              mutation.live += mutant.live ? 1 : 0;
              mutation.total++;
            }
          });
        });
        return mutation;
      });

      data.analysis = mutationController.analyse(data, categories_obj);

      fs.outputJson('resultData.json', data, {
        spaces: '\t'
      }, err => {});
    })
    .then(() => {
      console.log("---------- Run Complete -----------")
    })
};

/* GET home page. */
router.get('/', (req, res, next) => {
  if (ran) {
    fs.readJson(path.resolve(__dirname, '../resultData.json'), (err, data) => {
      return res.render('index', {
        title: 'Mutation Testing',
        data
      });
    });
  } else {
    fs.readJson(path.resolve(__dirname, '../resultData.json'), (err, data) => {
      if (err) {
        return res.render('index', {
          title: 'Mutation Testing',
          data: false,
        });
      } else {
        createRoutes(data)
        return res.render('index', {
          title: 'Mutation Testing',
          data
        });
      }
    })

  }
});

/* GET run. */
router.get('/run', (req, res, next) => {
  if (!running) {
    running = true;
    run()
      .then(() => {
        ran = true;
        running = false;
      })
      .then(() => {
        return res.redirect('/');
      })
  }
});

/* GET axe test. */
router.get('/axe', (req, res, next) => {
  return res.render('axetest', {
    title: 'Axe Testing',
  })
});

/* GET mutation view */
router.get('/mutant-operators', (req, res, next) => {
  fs.readJson(path.resolve(__dirname, '../resultData.json'), (err, data) => {
    return res.render('mutant-operators', {
      title: 'Mutants',
      mutations: data.mutations,
    })
  });
});

/* GET analysis */
router.get('/analysis', (req, res, next) => {
  fs.readJson(path.resolve(__dirname, '../resultData.json'), (err, data) => {
    data.analysis = mutationController.analyse(data, data.analysis.categories);
    fs.outputJson('resultData.json', data, {
      spaces: '\t'
    }, err => {});
    return res.render('analysis', {
      title: 'Analysis',
      data,
    })
  });
});

module.exports = router;