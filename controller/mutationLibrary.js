const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [{
    "id": 1,
    "name": "empty-img-alt-text",
    "description": "Image must have alt text",
    "class": "Attribute Change",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      return $("img").length;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img").attr('alt', '');
      return mutant_dom.serialize();
    }
  },

  {
    "id": 2,
    "name": "remove-img-alt-text",
    "description": "Image must have alt text",
    "class": "Attribute Change",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      return $("img").length;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img").attr('alt', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": 3,
    "name": "empty-aria-label",
    "description": "Buttons should be labeled",
    "class": "Attribute Change",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("button").length && typeof $("button").attr('aria-label') != "undefined") {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button").attr('aria-label', "");
      return mutant_dom.serialize();
    }
  },
  {
    "id": 4,
    "name": "remove-aria-label",
    "description": "Buttons should be labeled",
    "class": "Attribute Change",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("button").length && typeof $("button").attr('aria-label') != "undefined") {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button").attr('aria-label', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": 5,
    "name": "empty-title",
    "description": "Ensures page has a title",
    "class": "Attribute Change",
    "check": (dom) => {
      const document = dom.window.document;
      return document.title.length > 0;
    },
    "mutation": (mutant_dom) => {
      const document = mutant_dom.window.document;
      document.title = "";
      return mutant_dom.serialize();
    }
  },
  {
    "id": 6,
    "name": "remove-button-text",
    "description": "Ensures buttons have discernible text",
    "class": "Attribute Change",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      return $("button").length;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button").html('');
      return mutant_dom.serialize();
    }
  },
  /*
    {
      "id": 0,
      "name": "equiv-test",
      "description": "Ensures equiv are found (exact equivs)",
      "class": "Attribute Change",
      "check": (dom) => {
        return true;
      },
      "mutation": (mutant_dom) => {
        return mutant_dom.serialize();
      }
    },
    */

];