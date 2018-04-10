const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [{
  "id": "1.3.1-08",
  "name": "reorder-definition-list",
  "description": "definition-list - must be structured correctly",
  "class": "Reorder Element",
  "successCriteria": "1.3.1",
  "check": (dom) => {
    let $ = require('jquery')(dom.window);
    if ($("dt").length) {
      return true
    }
    return false;
  },
  "mutation": (mutant_dom) => {
    let $ = require('jquery')(mutant_dom.window);
    let dt = $("dt").first();
    dt.insertBefore(dt.parent());
    return mutant_dom.serialize();
  }
}, ]