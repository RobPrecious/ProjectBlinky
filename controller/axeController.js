var AxeBuilder = require('axe-webdriverjs');
var WebDriver = require('selenium-webdriver');


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
          .analyze(function (results) {
            return results;
          });
      })
      .then((results) => {
        driver.close();
        return results;
      })
  }
}

module.exports = axeController;