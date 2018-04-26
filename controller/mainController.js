const path = require('path');
const fs = require('fs-extra');

const mutationController = require('../controller/mutationController');
const validityController = require('../controller/validityController');
const toolController = require('../controller/toolController');

const mutationLibrary = require('../mutantOperators/mutationLibrary')();



const WCAG = {
  1: "1. Percievable",
  "1.1": "1.1. Text Alternatives",
  "1.1.1": "1.1.1. Non-text Content",

  "1.2": "1.2. Time-based Media",
  "1.2.1": "1.2.1. Audio-only and Video-only (Prerecorded)",
  "1.2.2": "1.2.2. Captions (Prerecorded)",
  "1.2.3": "1.2.3. Audio Description or Media Alternative (Prerecorded)",
  "1.2.4": "1.2.4. Captions (Live)",
  "1.2.5": "1.2.5. Audio Description (Prerecorded)",
  "1.2.6": "1.2.6. Sign Language (Prerecorded)",
  "1.2.7": "1.2.7. Extended Audio Description (Prerecorded)",
  "1.2.8": "1.2.8. Media Alternative (Prerecorded)",
  "1.2.9": "1.2.9. Audio-only (Live)",

  "1.3": "1.3. Adaptable",
  "1.3.1": "1.3.1. Info and Relationships",
  "1.3.2": "1.3.2. Meaningful Sequence",
  "1.3.3": "1.3.3. Sensory Characteristics",

  "1.4": "1.4. Distinguishable",
  "1.4.1": "1.4.1. Use of Color",
  "1.4.2": "1.4.2. Audio Control",
  "1.4.3": "1.4.3. Contrast (Minimum)",
  "1.4.4": "1.4.4. Resize text",
  "1.4.5": "1.4.5. Images of Text",
  "1.4.6": "1.4.6. Contrast (Enhanced)",
  "1.4.7": "1.4.7. Low or No Background Audio",
  "1.4.8": "1.4.8. Visual Presentation",
  "1.4.9": "1.4.9. Images of Text (No Exception)",


  2: "2. Operable",
  "2.1": "2.1. Keyboard Accessible",
  "2.1.1": "2.1.1. Keyboard",
  "2.1.2": "2.1.2. No Keyboard Trap",
  "2.1.3": "2.1.3. Keyboard (No Exception)",

  "2.2": "2.2. Enough Time",
  "2.2.1": "2.2.1. Timing Adjustable",
  "2.2.2": "2.2.2. Pause Stop Hide",
  "2.2.3": "2.2.3. No Timing",
  "2.2.4": "2.2.4. Interruptions",
  "2.2.5": "2.2.5. Re-authenticating",

  "2.3": "2.3. Seizures",
  "2.3.1": "2.3.1 Three Flashes or Below Threshold",
  "2.3.2": "2.3.2 Three Flashes",


  "2.4": "2.4. Navigable",
  "2.4.1": "2.4.1. Bypass Blocks",
  "2.4.2": "2.4.2. Page Titled",
  "2.4.3": "2.4.3. Focus Order",
  "2.4.4": "2.4.4. Link Purpose (In Context)",
  "2.4.5": "2.4.5. Multiple Ways",
  "2.4.6": "2.4.6. Headings and Labels",
  "2.4.7": "2.4.7. Focus Visible",
  "2.4.8": "2.4.8. Location",
  "2.4.9": "2.4.9. Link Purpose (Link Only)",
  "2.4.10": "2.4.10. Section Headings",

  3: "3. Understandable",
  "3.1": "3.1. Readable",
  "3.1.1": "3.1.1. Language of Page",
  "3.1.2": "3.1.2. Language of Parts",
  "3.1.3": "3.1.3. Unusual Words",
  "3.1.4": "3.1.4. Abbreviations",
  "3.1.5": "3.1.5. Reading Level",
  "3.1.6": "3.1.6. Pronunciation",

  "3.2": "3.2. Predictable",
  "3.2.1": "3.2.1. On Focus",
  "3.2.2": "3.2.2. On Input",
  "3.2.3": "3.2.3. Consistent Navigation",
  "3.2.4": "3.2.4. Consistent Identification",
  "3.2.5": "3.2.5. Change on Request",

  "3.3": "3.3. Input Assistance",
  "3.3.1": "3.3.1. Error Identification",
  "3.3.2": "3.3.2. Labels or Instructions",
  "3.3.3": "3.3.3. Error Suggestion",
  "3.3.4": "3.3.4. Error Prevention (Legal Financial Data)",
  "3.3.5": "3.3.5. Help",
  "3.3.6": "3.3.6. Error Prevention (All)",


  4: "4. Robust",
  "4.1": "4.1. Compatible",
  "4.1.1": "4.1.1. Parsing",
  "4.1.2": "4.1.2. Name Role Value",
}

const mainController = {
  getWCAGSC: () => {
    return [
      "1.1.1. Non-text Content",
      "1.2.1. Audio-only and Video-only (Prerecorded)",
      "1.2.2. Captions (Prerecorded)",
      "1.2.3. Audio Description or Media Alternative (Prerecorded)",
      "1.2.4. Captions (Live)",
      "1.2.5. Audio Description (Prerecorded)",
      "1.2.6. Sign Language (Prerecorded)",
      "1.2.7. Extended Audio Description (Prerecorded)",
      "1.2.8. Media Alternative (Prerecorded)",
      "1.2.9. Audio-only (Live)",
      "1.3.1. Info and Relationships",
      "1.3.2. Meaningful Sequence",
      "1.3.3. Sensory Characteristics",
      "1.4.1. Use of Color",
      "1.4.2. Audio Control",
      "1.4.3. Contrast (Minimum)",
      "1.4.4. Resize text",
      "1.4.5. Images of Text",
      "1.4.6. Contrast (Enhanced)",
      "1.4.7. Low or No Background Audio",
      "1.4.8. Visual Presentation",
      "1.4.9. Images of Text (No Exception)",
      "2.1.1. Keyboard",
      "2.1.2. No Keyboard Trap",
      "2.1.3. Keyboard (No Exception)",
      "2.2.1. Timing Adjustable",
      "2.2.2. Pause Stop Hide",
      "2.2.3. No Timing",
      "2.2.4. Interruptions",
      "2.2.5. Re-authenticating",
      "2.3.1 Three Flashes or Below Threshold",
      "2.3.2 Three Flashes",
      "2.4.1. Bypass Blocks",
      "2.4.2. Page Titled",
      "2.4.3. Focus Order",
      "2.4.4. Link Purpose (In Context)",
      "2.4.5. Multiple Ways",
      "2.4.6. Headings and Labels",
      "2.4.7. Focus Visible",
      "2.4.8. Location",
      "2.4.9. Link Purpose (Link Only)",
      "2.4.10. Section Headings",
      "3.1.1. Language of Page",
      "3.1.2. Language of Parts",
      "3.1.3. Unusual Words",
      "3.1.4. Abbreviations",
      "3.1.5. Reading Level",
      "3.1.6. Pronunciation",
      "3.2.1. On Focus",
      "3.2.2. On Input",
      "3.2.3. Consistent Navigation",
      "3.2.4. Consistent Identification",
      "3.2.5. Change on Request",
      "3.3.1. Error Identification",
      "3.3.2. Labels or Instructions",
      "3.3.3. Error Suggestion",
      "3.3.4. Error Prevention (Legal Financial Data)",
      "3.3.5. Help",
      "3.3.6. Error Prevention (All)",
      "4.1.1. Parsing",
      "4.1.2. Name Role Value",
    ];
  },
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
            "WCAGAnalysis": mainController.wcagAnalysis(mutationAnalysis)
          }
        }

      })
  },

  getWCAGString: (criterion) => {
    let output = "";
    //Principles
    criterion.map(sc => output += WCAG[parseInt(sc.split(".")[0])] + " ");
    output += ","
    //Guidelines
    criterion.map(sc => output += WCAG[sc.split(".")[0] + "." + sc.split(".")[1]] + " ");
    output += ","
    //SC
    criterion.map(sc => output += WCAG[sc] + " ");

    return output;
  },

  wcagAnalysis: (data) => {
    // Technique data
    let techniqueAnalysis = [];
    let technique_list = [];

    data.map(mutant => {
      if (technique_list.indexOf(mutant.WCAG.technique) == -1) {
        technique_list.push(mutant.WCAG.technique);
        techniqueAnalysis.push({
          "name": mutant.WCAG.technique,
          "successCriterion": mutant.WCAG.successCriterion,
          "axe": {
            "total": 0,
            "violations": 0,
            "live": 0,
            "killed": 0,
          },
        })
      }
      let technique = techniqueAnalysis.find(tech => tech.name == mutant.WCAG.technique);
      technique.axe.total += mutant.analysis.axe.total;
      technique.axe.violations += mutant.analysis.axe.violations;
      technique.axe.live += mutant.analysis.axe.live;
      technique.axe.killed += mutant.analysis.axe.killed;
    })

    let techniqueOverall = {
      "total": 0,
      "live": 0,
      "killed": 0,
    };


    //Success Criteria Level
    let scAnalysis = [];
    let sc_list = [];

    techniqueAnalysis.map(technique => {
      techniqueOverall.total++;
      if (technique.axe.killed > 0) {
        techniqueOverall.killed++;
      } else {
        techniqueOverall.live++;
      }

      technique.successCriterion.map(sc => {
        if (sc_list.indexOf(sc) == -1) {
          sc_list.push(sc);
          scAnalysis.push({
            "id": sc,
            "name": WCAG[sc],
            "techniques": [],
            "axe": {
              "total": 0,
              "violations": 0,
              "live": 0,
              "killed": 0,
            },
          })
        }
        let success = scAnalysis.find(found => found.id == sc);
        success.axe.total += technique.axe.total;
        success.axe.violations += technique.axe.violations;
        success.axe.live += technique.axe.live;
        success.axe.killed += technique.axe.killed;
        success.techniques.push(technique);
      })

    })


    let scOverall = {
      "total": 0,
      "live": 0,
      "killed": 0,
    };
    scAnalysis.map(sc => {
      scOverall.total++;
      if (sc.axe.killed > 0) {
        scOverall.killed++;
      } else {
        scOverall.live++;
      }
    });

    return {
      techniqueOverall,
      techniqueAnalysis,
      scOverall,
      scAnalysis
    }
  },


  csvExportStandard: (res, data) => {
    let output = `${data.source.id} \n`
    output += `ID,Class,Sub Class,Description,# Killed,# Live,# Total,WCAG Principles,WCAG Guidelines,WCAG Success Criterion,WCAG Technique, \n`
    data.analysis.mutationAnalysis.map(mutation => {
      output += `${mutation.id}, ${mutation.class}, ${mutation.subclass},` +
        `${mutation.description}, ${mutation.analysis.axe.killed},` +
        `${mutation.analysis.axe.live}, ${mutation.analysis.axe.total},` +
        `${mainController.getWCAGString(mutation.WCAG.successCriterion)},${mutation.WCAG.technique},\n`;
    })
    fs.writeFile('output.csv', output, 'utf8', function (err) {
      if (err) {
        console.log(err);
      } else {
        res.setHeader('Content-Disposition', `attachment; filename=${data.source.id}-results.csv`);
        return res.sendFile(path.resolve(__dirname, '../output.csv'));
      }
    });
  },
  csvExportTechnique: (res, data) => {
    let output = `Technique,Kill Score (%),Kill Score (n/m), \n`
    data.analysis.WCAGAnalysis.techniqueAnalysis.map(technique => {
      output += `${technique.name}, ${(technique.axe.killed / technique.axe.total).toFixed(2) * 100 + "%"}, ${technique.axe.killed + "/" + technique.axe.total},\n`
    })
    fs.writeFile('output.csv', output, 'utf8', function (err) {
      if (err) {
        console.log(err);
      } else {
        res.setHeader('Content-Disposition', `attachment; filename=${saved.source.id}-technique-results.csv`);
        return res.sendFile(path.resolve(__dirname, '../output.csv'));
      }
    });
  },
  csvExportSCWithTechnique: (res, data) => {
    let output = `Success Criteria,Techniques,Kill Score (%),Kill Score (n/m), \n`
    mainController.getWCAGSC().map(success => {
      let sc = data.analysis.WCAGAnalysis.scAnalysis.find(w => w.name == success);
      if (sc) {
        output += `${sc.name},, ${(sc.axe.killed / sc.axe.total).toFixed(2) * 100 + "%"}, ${sc.axe.killed + "/" + sc.axe.total},\n`;
        sc.techniques.map(technique => {
          output += `,${technique.name}, ${(technique.axe.killed / technique.axe.total).toFixed(2) * 100 + "%"}, ${technique.axe.killed + "/" + technique.axe.total},\n`
        })
      } else {
        output += `${success},0%, 0/0,\n`;
      }

    })
    fs.writeFile('output.csv', output, 'utf8', function (err) {
      if (err) {
        console.log(err);
      } else {
        res.setHeader('Content-Disposition', `attachment; filename=${saved.source.id}-sc-results.csv`);
        return res.sendFile(path.resolve(__dirname, '../output.csv'));
      }
    });
  },

  csvExportSCWithoutTechnique: (res, data) => {
    let output = `Success Criteria,Kill Score (%),Kill Score (n/m), \n`
    mainController.getWCAGSC().map(success => {
      let sc = data.analysis.WCAGAnalysis.scAnalysis.find(w => w.name == success);
      if (sc) {
        output += `${sc.name}, ${(sc.axe.killed / sc.axe.total).toFixed(2) * 100 + "%"}, ${sc.axe.killed + "/" + sc.axe.total},\n`;
      } else {
        output += `${success},0%, 0/0,\n`;
      }
    })
    fs.writeFile('output.csv', output, 'utf8', function (err) {
      if (err) {
        console.log(err);
      } else {
        res.setHeader('Content-Disposition', `attachment; filename=${saved.source.id}-sc-results.csv`);
        return res.sendFile(path.resolve(__dirname, '../output.csv'));
      }
    });
  },

}

module.exports = mainController;