const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs-extra');

const mainController = require('../controller/mainController');
const mutationController = require('../controller/mutationController');
const toolController = require('../controller/toolController');
const mutationLibrary = require('../controller/mutationLibrary');
const mutator = require('../controller/mutator');


const validator = require('html-validator');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

let running = false;

// ---------------------- STAGE 1 --------------------------- //
router.get('/', (req, res, next) => {
  if (!req.session.data) {
    req.session.data = {
      "stage": 1
    }
  }
  return res.render('index', {
    "stage": req.session.data.stage,
    "savedResult": fs.existsSync('result.json'),
  })
})

router.get('/testbench', (req, res, next) => {
  req.session.data.stage = 2;

  const source = "TestBench.v.0.0.2.html";
  loadSource(source);
  mainController.checkSource(source, "TestBench")
    .then(output => {
      req.session.data.source = output;
      return res.json(output);
    })
    .catch(err => {
      console.log(err);
    })
})

// ---------------------- STAGE 2 --------------------------- //
router.get('/view-mutation-summary', (req, res, next) => {
  const source = req.session.data.source;
  return res.render('mutation-summary', {
    "allMutations": mutationLibrary,
    "viableMutations": source.mutations.viableRaw,
    "nonViableMutations": source.mutations.nonViableRaw,
  })
})

router.get('/view-violation-summary', (req, res, next) => {
  return res.render('violations-summary', {
    "axe": req.session.data.source.ATTResults.axe,
    "pa11y": req.session.data.source.ATTResults.pa11y,
  });
})

router.get('/view-validation-summary', (req, res, next) => {
  return res.render('validation-summary', {
    "validity": req.session.data.source.validity
  });
})

router.get('/mutate-source', (req, res, next) => {
  return mutationController.mutateSource(req.session.data.source, mutationLibrary)
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
      req.session.data.source = result;
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
  try {
    const source = req.session.data.source;
    return toolController.pa11yTools.runSM(source)
      .then(source => toolController.axeTools.runSM(source))
      .then(source => {
        fs.writeFileSync('result.json', JSON.stringify(source));
        return source;
      })
      .then(source => mainController.postToolAnalysis(source))
      .then(result => {
        console.log("Complete")
        req.session.data.stage = 4;
        req.session.data.stage4data = result;
        return res.json(result);
      })
      .catch(console.error.bind(console))

  } catch (err) {
    console.log(err);
  }
})

router.get("/analyse", (req, res, next) => {
  const data = req.session.data.results;
  return res.json(mutationController.analyse(data.source, data.categories_obj));
})


router.get("/analyse-saved", (req, res, next) => {
  req.session.data.savedResult = JSON.parse(fs.readFileSync('result.json'));
  mainController.postToolAnalysis(req.session.data.savedResult)
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