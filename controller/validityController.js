const path = require('path');

const validator = require('html-validator');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const validityController = {
  validityCheckFromFile: (location) => {
    return JSDOM.fromFile(path.resolve(__dirname, "../views/" + location))
      .then(dom => validityController.validityCheckFromDOM(dom));
  },

  validityCheckFromDOM: (dom) => {
    return validator({
        format: 'json',
        data: dom.serialize(),
      })
      .then(data => validityController.filterFormatValidity(data))
      .catch(err => {
        console.log(err)
      })
  },

  filterFormatValidity: (results) => {
    return new Promise(res => {
      if (results.messages.length > 0) {
        results.messages = results.messages.filter(msg => msg.message != 'Attribute “href” not allowed on element “span” at this point.')
      }

      res({
        "valid": results.messages.length == 0,
        "validityCheckResult": results
      })

    })
  },

}

module.exports = validityController;