var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');
const pa11y = require('pa11y');
const url = "http://localhost:3000";



const axeTools = {
  testURL: url => {
    console.log("aXe Testing: " + url);
    let driver = new WebDriver.Builder()
      .forBrowser('chrome')
      .build();

    return driver
      .get(url)
      .then(function () {
        return AxeBuilder(driver)
          .withTags(['best-practice', 'wcag2a', 'wcag2aa', 'section508', 'cat'])
          .disableRules(['href-no-hash', 'skip-link'])
          .analyze(function (results) {

            return results;
          });
      })
      .then(results => {
        driver.close();
        return results;
      })
  },
  // Run Source and its mutants
  runSM: (source) => {
    console.log("---------- AXE runSM() ----------");
    return axeTools.testURL(url + source.route)
      .then(result => {
        source.ATTResults.axe = {
          "violationsCount": result.violations.length,
          "raw": result.violations
        };
        return source;
      })
      .then((source) => {
        const mutantRoutes = source.mutants.map(mutant => mutant.route);
        const axeFunction = route => {
          console.log("------ Testing", route, "with axe ----");
          return axeTools.testURL(url + route)
        }

        // convert each url to a function that returns a promise
        const funcs = mutantRoutes.map(route => () => axeFunction(route));

        // execute Promises in serial
        return promiseSerial(funcs)
          .then(results => {
            source.mutants.map((mutant, index) => {
              mutant.ATTResults.axe = {
                "violationsCount": results[index].violations.length,
                "raw": results[index].violations
              };
            })
            console.log("---------- Axe Complete ----------");

            return source;
          })
          .catch(console.error.bind(console))
      })
      .catch(console.error.bind(console))

  },
}

const pa11yTools = {
  testURL: (url) => {
    console.log("pa11y Testing: " + url);
    return pa11y(url).then((results) => {
      return results;
    });
  },

  // Run Source and its mutants
  runSM: (source) => {
    console.log("---------- Pa11y runSM() ----------");

    console.log("----- pa11y Testing Source -----");
    return pa11y(url + source.route)
      .then((result) => {
        source.ATTResults.pa11y = {
          "violationsCount": result.issues.length,
          "raw": result.issues
        };
        return source;
      })
      .then((source) => {
        console.log("----- pa11y Testing Mutants -----");
        // some url's to resolve
        const mutantRoutes = source.mutants.map(mutant => mutant.route);

        const pa11yFunction = route => {
          console.log("----- Testing", route, "with pa11y -----");
          return pa11y(url + route);
        }

        // convert each url to a function that returns a promise
        const funcs = mutantRoutes.map(route => () => pa11yFunction(route));



        // execute Promises in serial
        return promiseSerial(funcs)
          .then(results => {
            source.mutants.map((mutant, index) => {
              mutant.ATTResults.pa11y = {
                "violationsCount": results[index].issues.length,
                "raw": results[index].issues
              };
            })
            console.log("---------- Pa11y Complete ----------");

            return source;
          })
          .catch(console.error.bind(console))
      })
      .catch(console.error.bind(console))
  },
}
const promiseSerial = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]))

module.exports = {
  axeTools,
  pa11yTools
};