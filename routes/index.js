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


function run() {
  //Create mutants
  return Promise.all(mutationController.getMutationPromises())
    .then(results => {
      return {
        sources: results
      };
    })
    // Create Routes for Mutants
    .then((data) => {
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
    })
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
      data.sources.map(source => {
        source.mutants.map(mutant => {
          mutant.live = mutant.axe.violations.length == source.axe.violations.length ? true : false;
          mutant.equiv = mutant.thisHTML == mutant.sourceHTML ? true : false;
        })
      });

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
    return res.render('index', {
      title: 'Mutation Testing',
      data: false,
    });
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

    mutationLibrary.map(mutation => {
      mutation.live = 0;
      mutation.violations = 0;

      data.sources.map(source => {
        source.mutants.map(mutant => {
          if (mutant.mutation.id == mutation.id) {
            mutation.violations += mutant.axe.violations.length;
            mutation.live += mutant.live ? 1 : 0;
          }
        });
      });
    });
  });

  return res.render('mutant-operators', {
    title: 'Mutants',
    mutations: mutationLibrary,
  })
});

module.exports = router;