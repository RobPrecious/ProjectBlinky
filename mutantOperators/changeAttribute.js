const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [
  // ------------------  1.1 Text Alternatives ------------------ //
  {
    "id": "1.1.1-01",
    "name": "remove-img-alt-text",
    "description": "Image must have alt text",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [{
        "name": "H37",
        "link": "https://www.w3.org/TR/WCAG20-TECHS/H37.html",
      }],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      return $("img").length;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img").first().attr('alt', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-02",
    "name": "empty-input-image-alt-text",
    "description": "Empty alternative text from <input type='image'> element",
    "class": "Change Attribute",
    "subclass": "Empty Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [{
        "name": "H36",
        "link": "https://www.w3.org/TR/WCAG20-TECHS/H36.html",
      }],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("input[type=image]").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type=image]").first().attr('alt', "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-03",
    "name": "remove-input-image-alt-text",
    "description": "Remove alternative text from <input type='image'> element",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [{
        "name": "H36",
        "link": "https://www.w3.org/TR/WCAG20-TECHS/H36.html",
      }],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("input[type=image]").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type=image]").first().attr('alt', null);
      return mutant_dom.serialize();
    }
  },
]