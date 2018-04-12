const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [{
    "id": "1.3.1-20",
    "name": "change-p-as-heading",
    "description": "Paragraph elements should not be styled as headers",
    "class": "Other",
    "subclass": "Change CSS",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.3. Adaptable",
      "successCriteria": "1.3.1. Info and Relationships",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("p").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("p").css("font-size", "150%").css("font-weight", "bold");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "2.4.2-01",
    "name": "empty-title",
    "description": "Empty title",
    "class": "Other",
    "subclass": "Change Page Value",
    "WCAG": {
      "principle": "2. Operable",
      "guideline": "2.4. Navigable",
      "successCriteria": "2.4.2. Page Titled",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
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

]