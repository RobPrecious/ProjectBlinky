var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');
const pa11y = require('pa11y');



const axeController = {
  testURL: url => {
    console.log("Testing: " + url);
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
      .then((results) => {
        driver.close();
        return results;
      })
  },

  runPa11y: (source) => {

    pa11y(source).then((results) => {
      console.log(results)
      return results;
    });
  },
}

module.exports = axeController;