const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs-extra');

const mutationController = require('../controller/mutationController');
const axeController = require('../controller/axeController');
const mutationLibrary = require('../controller/mutationLibrary');
const mutator = require('../controller/mutator');


const validator = require('html-validator');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const url = "http://localhost:3000";
let running = false;

// ---------------------- STAGE 1 --------------------------- //
router.get('/', (req, res, next) => {
  return res.render('index', {
    "stage": req.session.data.stage,
    "savedResult": fs.existsSync('result.json'),
  })
})

router.get('/testbench', (req, res, next) => {
  const source = "TestBench.v.0.0.2.html";
  req.session.stage = 2;
  loadSource(source);
  mutationController.checkSource(source, "TestBench")
    .then(output => {
      req.session.data.stage2data = output;
      return res.json(output);
    })
    .catch(err => {
      console.log(err);
    })

})

// ---------------------- STAGE 2 --------------------------- //
router.get('/view-mutation-summary', (req, res, next) => {
  const data = req.session.data.stage2data;
  return res.render('mutation-summary', {
    "allMutations": mutationLibrary,
    "viableMutations": data.mutations.viableRaw,
    "nonViableMutations": data.mutations.nonViableRaw,
  })

})

router.get('/view-violation-summary', (req, res, next) => {
  return res.render('violations-summary', {
    "axe": req.session.data.stage2data.axe
  });
})

router.get('/view-validation-summary', (req, res, next) => {
  return res.render('validation-summary', {
    "validity": req.session.data.stage2data.validity
  });
})

router.get('/mutate-source', (req, res, next) => {
  return mutationController.mutateSource(req.session.data.stage2data.source, mutationLibrary)
    .then(result => {
      result.mutants.map(mutant => {
        router.get('/mutants/' + mutant.id, (req, res, next) => {
          res.render('main', {
            template: mutant.file
          });
        });
      })
      return result;
    })
    .then(result => {
      req.session.data.stage = 3
      req.session.data.stage3data = result;
      return res.json(result);
    })
})

// ---------------------- STAGE 3 --------------------------- //
router.get('/view-mutants-summary', (req, res, next) => {
  return res.render('mutants-summary', {
    "source": req.session.data.stage3data
  });
})

router.get('/run-axe-agaist-axe', (req, res, next) => {
  const source = req.session.data.stage3data;
  return axeController.testURL(url + source.route).then(result => {
      source.axe = {
        violations: result.violations
      };
      return source;
    })
    .then((source) => {
      return Promise.all(source.mutants.map(mutant => {
          return axeController.testURL(url + mutant.route).then(result => {
            mutant.axe = {
              violations: result.violations
            };
          })
        }))
        .then(() => {
          return source;
        })
    })
    .then(toolResult => {
      // Export result to json
      const dataToBeSaved = {
        "toolResult": toolResult,
        "currentState": req.session.data,
      }
      fs.writeFileSync('result.json', JSON.stringify(dataToBeSaved));
      return toolResult;
    })
    .then(source => mutationController.postToolAnalysis(source))
    .then(result => {
      console.log("Complete")
      req.session.data.stage = 4;
      req.session.data.stage4data = result;
      return res.json(result);
    })
})

router.get("/analyse", (req, res, next) => {
  const data = req.session.data.results;
  return res.json(mutationController.analyse(data.source, data.categories_obj));
})


router.get("/analyse-saved", (req, res, next) => {
  req.session.data.savedResult = JSON.parse(fs.readFileSync('result.json'));
  mutationController.postToolAnalysis(req.session.data.savedResult)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/get-session', (req, res, next) => {
  console.log(req.session.data.stage);
  return res.json(req.session.data);
})

function loadSource(location) {
  router.get('/v2/source', (req, res, next) => {
    res.render('main', {
      template: location
    });
  });
}



module.exports = router;