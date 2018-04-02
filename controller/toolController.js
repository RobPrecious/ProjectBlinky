var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');
const pa11y = require('pa11y');
const baseURL = "http://localhost:3000";

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
    console.log("---------- Axe Starting ----------");
    return axeTools.testURL(baseURL + source.route)
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
          return axeTools.testURL(baseURL + route)
        }

        const funcs = mutantRoutes.map(route => () => axeFunction(route));

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


const promiseSerial = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]))


module.exports = {
  axeTools,
}