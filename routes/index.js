const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs-extra');

const mainController = require('../controller/mainController');
const mutationController = require('../controller/mutationController');
const toolController = require('../controller/toolController');
const mutationLibrary = require('../mutantOperators/mutationLibrary')();
const mutator = require('../controller/mutator');

const validator = require('html-validator');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
var csv = require('csv');


let running = false;

// ---------------------- STAGE 1 --------------------------- //
router.get('/', (req, res, next) => {
  try {
    let saved = false;

    if (!req.session.data) {
      req.session.data = {
        "stage": 1
      }
    }
    if (fs.existsSync('results.json')) {
      try {
        saved = fs.readJSONSync('results.json')
      } catch (err) {
        console.log("cannot parse json file")
      }
    }
    return res.render('index', {
      "stage": req.session.data.stage,
      "savedResult": saved,
    })
  } catch (err) {
    console.log(err);
  }
})

router.get('/testbench', (req, res, next) => {
  try {
    req.session.data.stage = 2;

    const source = "TestBench.v.0.0.3.html";
    router.get('/source', (req, res, next) => {
      res.render('templates/mutant-template', {
        template: "../" + source
      });
    });
    mainController.checkSource(source, "TestBench", "/source")
      .then(output => {
        req.session.data.source = output;
        return res.json(output);
      })
      .catch(err => {
        console.log(err);
      })
  } catch (err) {
    console.log(err)
  }
})

// ---------------------- STAGE 2 --------------------------- //
router.get('/view-mutation-summary', (req, res, next) => {
  const source = req.session.data.source;
  return res.render('templates/page-template', {
    "template": "../summary-partials/mutation-summary",
    "allMutations": mutationLibrary,
    "viableMutations": source.mutations.viableRaw,
    "nonViableMutations": source.mutations.nonViableRaw,
  })
})

router.get('/view-violation-summary', (req, res, next) => {
  return res.render('templates/page-template', {
    "template": "../summary-partials/violations-summary",
    "axe": req.session.data.source.ATTResults.axe,
    "pa11y": req.session.data.source.ATTResults.pa11y,
  });
})

router.get('/view-validation-summary', (req, res, next) => {
  return res.render('templates/page-template', {
    "template": "../summary-partials/validation-summary",
    "validity": req.session.data.source.validity
  });
})

router.get('/mutate-source', (req, res, next) => {
  return mutationController.mutateSource(req.session.data.source, mutationLibrary, "")
    .then(result => {
      result.mutants.map(mutant => {
        router.get('/mutants/' + mutant.id, (req, res, next) => {
          res.render('templates/mutant-template', {
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
  return res.render('templates/page-template', {
    "template": "../summary-partials/mutants-summary",
    "source": req.session.data.source
  });
})

router.get('/run-att', (req, res, next) => {
  try {
    const source = req.session.data.source;
    return toolController.axeTools.runSM(source, "")
      .then(source => {
        fs.outputJsonSync('pre-analysis.json', source, {
          spaces: '\t'
        }, err => {});
        return source;
      })
      .then(source => mainController.postToolAnalysis(source))
      .then(source => {
        fs.outputJsonSync('results.json', source, {
          spaces: '\t'
        }, err => {});
        return source;
      })
      .then(result => {
        console.log("Complete")
        req.session.data.stage = 4;
        req.session.data.source = result.source;
        req.session.data.analysis = result.analysis;
        return res.json(result);
      })
      .catch(console.error.bind(console))

  } catch (err) {
    console.log(err);
  }
})

// ---------------------- STAGE 4 --------------------------- //

router.get('/view-axe-results', (req, res, next) => {
  return res.render('templates/page-template', {
    "template": "../summary-partials/axe-summary",
    "source": req.session.data.source
  });
})




router.get("/load-saved", (req, res, next) => {
  req.session.data = fs.readJSONSync('results.json');
  req.session.data.stage = 4;

  //Will need re-implementing in the case where other input html methods are used
  const source = "TestBench.v.0.0.2.html";
  loadSource(source);
  req.session.data.source.mutants.map(mutant => {
    router.get('/mutants/' + mutant.id, (req, res, next) => {
      res.render('templates/mutant-template', {
        template: mutant.file
      });
    });
  })

  mainController.postToolAnalysis(req.session.data.source)
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

router.get('/export-csv', (req, res, next) => {
  try {
    if (req.session.data && req.session.data.stage == 4) {
      let output = `${req.session.data.source.id} \n`
      output += `ID, Class, Description, # Killed, # Live, # Total, WCAG SC \n`
      req.session.data.analysis.mutationAnalysis.map(mutation => {
        output += `${mutation.id}, ${mutation.class},` +
          `${mutation.description}, ${mutation.analysis.axe.killed},` +
          `${mutation.analysis.axe.live}, ${mutation.analysis.axe.total},` +
          `${mutation.successCriteria}\n`;
      })
      fs.writeFile('output.csv', output, 'utf8', function (err) {
        if (err) {
          console.log(err);
        } else {
          res.setHeader('Content-Disposition', `attachment; filename=${req.session.data.source.id}-results.csv`);
          return res.sendFile(path.resolve(__dirname, '../output.csv'));
        }
      });
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/source', (req, res, next) => {
  res.render('templates/mutant-template', {
    template: '../TestBench.v.0.0.3.html'
  });
});




module.exports = router;