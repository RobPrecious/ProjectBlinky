const path = require('path');

const validator = require('html-validator');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const validityController = {
  validityCheckSource: (location) => {
    return JSDOM.fromFile(path.resolve(__dirname, "../views/" + location))
      .then(dom => {
        return validator({
            format: 'json',
            data: dom.serialize(),
          })
          .then((data) => {
            return data
          })

      })

  }
}

module.exports = validityController;