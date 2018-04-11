const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs-extra');

const mutationLibrary = require('../mutantOperators/mutationLibrary')();

const mainController = require('../controller/mainController');
const mutationController = require('../controller/mutationController');
const toolController = require('../controller/toolController');


router.get('/suite', (req, res, next) => {
  console.log(mutationLibrary.length, mutationLibrary.map(mut => mut.id));
  let saved = false;

  if (fs.existsSync('results.json')) {
    try {
      saved = fs.readJSONSync('results.json')
    } catch (err) {
      console.log("cannot parse json file")
    }
  }

  return res.render('mutationOperatorSuite', {
    title: "Mutation Operator Suite",
    saved,
    operators: saved ? mergeSaved(saved.analysis.mutationAnalysis) : mutationLibrary,
  });
})

router.get('/get-saved-analysis', (req, res, next) => {
  let saved = false;

  if (fs.existsSync('results.json')) {
    try {
      saved = fs.readJSONSync('results.json')
    } catch (err) {
      console.log("cannot parse json file")
    }
  }

  if (saved) {
    return res.json(saved);
  } else {
    return res.json("Something went wrong");
  }
})

router.post('/test-mutant-operation', (req, res, next) => {
  try {
    const exists = mutationLibrary.find(mut => mut.id == req.body.mutant_id);
    const source_file = "TestBench.v.0.0.2.html";

    let saved = false;

    if (fs.existsSync('results.json')) {
      try {
        saved = fs.readJSONSync('results.json')
      } catch (err) {
        console.log("cannot parse json file")
      }
    }

    if (exists) {
      return new Promise((resolve, reject) => {
          router.get('/source', (req, res, next) => {
            res.render('templates/mutant-template', {
              template: "../" + source_file
            });
          });
          resolve(source_file)
        })
        .then(source_file => mainController.checkSource(source_file, "TestBench", "/mut-op/source"))
        .then(source => mutationController.mutateSource(source, [exists], "/mut-op"))
        .then(source => {
          source.mutants.map(mutant => {
            router.get('/mutants/' + mutant.id, (req, res, next) => {
              res.render('templates/mutant-template', {
                template: mutant.file
              });
            });
          })
          return source;
        })
        .then(source => toolController.axeTools.runSM(source, "/mut-op"))
        .then(source => {
          if (saved) {
            let found = source.mutants.find(mut => mut.id == ("TestBench-m" + req.body.mutant_id));
            let inSaved = saved.source.mutants.find(mut => mut.id == ("TestBench-m" + req.body.mutant_id));
            if (!inSaved) {
              saved.source.mutants.push(found);
            } else {
              let index = saved.source.mutants.findIndex(mut => mut.id == ("TestBench-m" + req.body.mutant_id));
              saved.source.mutants[index] = found;
            }
            return saved.source;
          }
          return source;
        })
        .then(source => mainController.postToolAnalysis(source))
        .then(results => res.json(saveResults(results)))
        .catch(console.error.bind(console))


    } else {
      return res.json(req.body.mutant_id + " not found.");
    }
  } catch (err) {
    console.log(err);
  }
})


router.get('/test-all-operations', (req, res, next) => {
  try {
    const source_file = "TestBench.v.0.0.2.html";

    let saved = false;

    if (fs.existsSync('mutopResults.json')) {
      try {
        saved = fs.readJSONSync('mutopResults.json')
      } catch (err) {
        console.log("cannot parse json file")
      }
    }

    return new Promise((resolve, reject) => {
        router.get('/source', (req, res, next) => {
          res.render('templates/mutant-template', {
            template: "../" + source_file
          });
        });
        resolve(source_file)
      })
      .then(source_file => mainController.checkSource(source_file, "TestBench", "/mut-op/source"))
      .then(source => mutationController.mutateSource(source, mutationLibrary, "/mut-op"))
      .then(source => {
        source.mutants.map(mutant => {
          router.get('/mutants/' + mutant.id, (req, res, next) => {
            res.render('templates/mutant-template', {
              template: mutant.file
            });
          });
        })
        return source;
      })
      .then(source => toolController.axeTools.runSM(source, "/mut-op"))
      .then(source => mainController.postToolAnalysis(source))
      .then(results => res.redirect("/"))
      .catch(console.error.bind(console))

  } catch (err) {
    console.log(err);
  }
})

router.get('/export-csv', (req, res, next) => {
  try {
    if (fs.existsSync('results.json')) {
      try {
        saved = fs.readJSONSync('results.json')
      } catch (err) {
        console.log("cannot parse json file")
      }
    }
    if (saved) {
      let output = `${saved.source.id} \n`
      output += `ID, Class, Sub Class, Description, # Killed, # Live, # Total, WCAG Principle, WCAG Guideline, WCAG Success Criteria, \n`
      saved.analysis.mutationAnalysis.map(mutation => {
        output += `${mutation.id}, ${mutation.class}, ${mutation.subclass},` +
          `${mutation.description}, ${mutation.analysis.axe.killed},` +
          `${mutation.analysis.axe.live}, ${mutation.analysis.axe.total},` +
          `${mutation.WCAG.principle},${mutation.WCAG.guideline},${mutation.WCAG.successCriteria},\n`;
      })
      fs.writeFile('output.csv', output, 'utf8', function (err) {
        if (err) {
          console.log(err);
        } else {
          res.setHeader('Content-Disposition', `attachment; filename=${saved.source.id}-results.csv`);
          return res.sendFile(path.resolve(__dirname, '../output.csv'));
        }
      });
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;

function mergeSaved(saved) {
  return mutationLibrary.map(mut => {
    let found = saved.filter(saved => saved.id == mut.id);
    if (found.length > 0) {
      mut.analysis = found[0].analysis;
    }
    return mut;
  })
}

function saveResults(result) {

  fs.outputJsonSync('mutopResults.json', result, {
    spaces: '\t'
  }, err => {});

  return result.analysis.mutationAnalysis;

}