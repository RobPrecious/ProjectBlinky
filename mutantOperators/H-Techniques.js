const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [

  {
    "id": "H02-01",
    "name": "remove-alt-attribute",
    "description": "Finds img inside anchor tags and removes alt tag completely",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H2",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H2.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a > img").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a > img").first().attr("alt", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H02-02",
    "name": "empty-anchor-inner-html",
    "description": "Finds img inside anchor tags and empties the anchors innner html",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H2",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H2.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a > img").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a > img").first().parent("a").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H02-03",
    "name": "remove-anchor-text-leaving-img",
    "description": "Finds img inside anchor tags and removes text and leaves img",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H2",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H2.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a > img").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a > img").first().parent().html($("a > img").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H04-01",
    "name": "change-tab-index-to-minus-1",
    "description": "Finds tab index value and sets the first to minus 1, meaning other form elements are not accessible via tabbing",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H4",
      "successCriterion": ["2.4.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[tabindex]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[tabindex]").first().attr("tabindex", -1);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H24-01",
    "name": "empty-mapped-img-alt",
    "description": "Finds image with usemap value and empties its alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H24",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[usemap]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[usemap]").first().attr("alt", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H24-02",
    "name": "empty-area-alt",
    "description": "Finds area element and empties the alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H24",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("area").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("area").first().attr("alt", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H24-03",
    "name": "change-usemap-value-to-non-existing",
    "description": "Finds image with usemap value changes that value to a non-existing id",
    "class": "Attribute Change",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "technique": "H24",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[usemap]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[usemap]").first().attr("usemap", "#doesnotexist");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "H24-04",
    "name": "remove-mapped-img-alt",
    "description": "Finds image with usemap value and empties its alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H24",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[usemap]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[usemap]").first().attr("alt", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H24-05",
    "name": "remove-area-alt",
    "description": "Finds area element and empties the alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H24",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("area").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("area").first().attr("alt", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H25-01",
    "name": "empty-title",
    "description": "Finds area element and empties the alt attribute",
    "class": "Page Change",
    "subclass": "Empty Title",
    "WCAG": {
      "technique": "H25",
      "successCriterion": ["2.4.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H25.html",
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

  {
    "id": "H28-01",
    "name": "empty-abbr-title",
    "description": "Finds abbr element and empties the title attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H28",
      "successCriterion": ["3.1.4"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H28.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("abbr").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("abbr").first().attr("title", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H28-02",
    "name": "remove-abbr-title",
    "description": "Finds abbr element and removes the title attribute",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H28",
      "successCriterion": ["3.1.4"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H28.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("abbr").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("abbr").first().attr("title", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H30-01",
    "name": "empties-link-contents",
    "description": "Finds anchor element without img inside and remove inner text",
    "class": "Element Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H30",
      "successCriterion": ["1.1.1", "2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H30.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a:not(:has(img))").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a:not(:has(img))").first().html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H32-01",
    "name": "remove-submit-input",
    "description": "Finds a form with a input with type submit and removes it",
    "class": "Element Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H32",
      "successCriterion": ["3.2.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='submit']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type='submit']").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H32-02",
    "name": "remove-submit-button",
    "description": "Finds a form with a button with type submit and removes it",
    "class": "Element Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H32",
      "successCriterion": ["3.2.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("button[type='submit']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button[type='submit']").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H32-03",
    "name": "remove-submit-image",
    "description": "Finds a form with a image as submit input and removes it",
    "class": "Element Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H32",
      "successCriterion": ["3.2.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='image']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type='image']").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H32-04",
    "name": "reorder-submit-input",
    "description": "Finds a form with a input type submit and moves it to outside the form",
    "class": "Element Change",
    "subclass": "Reorder Attribute",
    "WCAG": {
      "technique": "H32",
      "successCriterion": ["3.2.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='submit']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type='submit']").first().insertAfter($("input[type='submit']").first().parent("form"));
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H32-05",
    "name": "reorder-submit-button",
    "description": "Finds a form with a button type submit and moves it to outside the form",
    "class": "Element Change",
    "subclass": "Reorder Attribute",
    "WCAG": {
      "technique": "H32",
      "successCriterion": ["3.2.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("button[type='submit']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button[type='submit']").first().insertAfter($("button[type='submit']").first().parent("form"));
      return mutant_dom.serialize();
    }
  },
  {
    "id": "H32-06",
    "name": "reorder-submit-image",
    "description": "Finds a form with a image as submit input and moves it to outside the form",
    "class": "Element Change",
    "subclass": "Reorder Attribute",
    "WCAG": {
      "technique": "H32",
      "successCriterion": ["3.2.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='image']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type='image']").first().insertAfter($("input[type='image']").first().parent("form"));
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H33-01",
    "name": "remove-submit-image",
    "description": "Finds anchor with title and empty the title attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H33",
      "successCriterion": ["2.4.4", "2.4.9"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H32.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[title]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a[title]").first().attr("title", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H35-01",
    "name": "empty-applet-alt-tag",
    "description": "Finds applet and empties alt tag",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H35",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H35.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("applet").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("applet").first().attr("alt", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H35-02",
    "name": "remove-applet-alt-tag",
    "description": "Finds applet and removes alt tag",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H35",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H35.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("applet").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("applet").first().attr("alt", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H35-03",
    "name": "remove-applet-internal-text",
    "description": "Finds applet and removes internal text",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H35",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H35.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("applet").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("applet").first().html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H36-01",
    "name": "empty-input-image-alt-tag",
    "description": "Finds input with type image and empties the alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H36",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H36.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='image']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type='image']").first().attr("alt", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H36-02",
    "name": "remove-input-image-alt-tag",
    "description": "Finds input with type image and removes the alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H36",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H36.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='image']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type='image']").first().attr("alt", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H37-01",
    "name": "remove-image-alt-tag",
    "description": "Finds input with type image and removes the alt attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H37",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H37.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img").first().attr("alt", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H39-01",
    "name": "empty-table-caption",
    "description": "Finds table caption and empties it",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H39",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("caption").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("caption").first().html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H39-02",
    "name": "reorder-table-caption",
    "description": "Finds table caption and reorders it to outside the table",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H39",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("caption").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("caption").first().insertAfter($("caption").first().parent("table"));

      return mutant_dom.serialize();
    }
  },

  {
    "id": "H39-03",
    "name": "remove-table-caption",
    "description": "Finds table caption and removes it",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H39",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("caption").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("caption").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H40-01",
    "name": "remove-dd-element",
    "description": "Finds dd element and removes it to leave a dt undescribed",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H40",
      "successCriterion": ["3.1.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("dl > dt").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("dl > dt").first().next().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H40-02",
    "name": "remove-dt-element",
    "description": "Finds first dt element in a dl and removes it to leave a dd without a term",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H40",
      "successCriterion": ["3.1.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("dl > dt").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("dl > dt").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H40-03",
    "name": "reorder-dt-element",
    "description": "Finds first dt element in a dl and reorders it out of the dl",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H40",
      "successCriterion": ["3.1.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("dl > dt").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("dl > dt").first().insertAfter($("dl > dt").first().parent("dl"));
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H40-04",
    "name": "reorder-dd-element",
    "description": "Finds first dd element in a dl and reorders it out of the dl",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H40",
      "successCriterion": ["3.1.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("dl > dt").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("dl > dd").first().insertAfter($("dl > dd").first().parent("dl"));
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H42-01",
    "name": "change-h1-to-h2",
    "description": "Change heading tag -  h1 -> h2",
    "class": "Element Change",
    "subclass": "Change Element Tag",
    "WCAG": {
      "technique": "H42",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H42.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("h1").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let newHeading = "<h2>" + $("h1").first().html() + "</h2>";
      $(newHeading).insertAfter($("h1").first());
      $("h1").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H42-02",
    "name": "change-h2-to-h3",
    "description": "Change heading tag -  h2 -> h3",
    "class": "Element Change",
    "subclass": "Change Element Tag",
    "WCAG": {
      "technique": "H42",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H42.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("h2").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let newHeading = "<h3>" + $("h2").first().html() + "</h3>";
      $(newHeading).insertAfter($("h2").first());
      $("h2").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H43-01",
    "name": "remove-id-of-th-header",
    "description": "Remove the id of th which is included in a td headers attribute",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H43",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H43.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("td[headers]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("td[headers]").first().attr("headers").split(" ")[0]).attr("id", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H43-02",
    "name": "remove-id-of-th-header-with-two-header-values",
    "description": "Remove the id of th which is included in a td headers attribute where two headers are provided",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H43",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H43.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("td[headers]").length) {
        for (var i = 0; i < $("td[headers]").length; i++) {
          if ($($("td[headers]").get(i)).attr("headers").split(" ").length == 2) {
            return true
          }
        };
        return false;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let element;
      for (var i = 0; i < $("td[headers]").length; i++) {
        if ($($("td[headers]").get(i)).attr("headers").split(" ").length == 2) {
          element = $($("td[headers]").get(i));
          break
        }
      };
      $("#" + element.attr("headers").split(" ")[1]).attr("id", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H43-03",
    "name": "change-td-headers-value-to-non-existant",
    "description": "Change td headers attribute to non-existant header",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H43",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H43.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("td[headers]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("td[headers]").first().attr("headers", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-01",
    "name": "empty-for-attribute-on-text-input-label",
    "description": "Empty for attribute on text input label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='text']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='text']:not([aria-label])").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-02",
    "name": "empty-for-attribute-on-file-input-label",
    "description": "Empty for attribute on file input label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='file']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='file']:not([aria-label])").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-03",
    "name": "empty-for-attribute-on-password-input-label",
    "description": "Empty for attribute on password input label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='password']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='password']:not([aria-label])").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-04",
    "name": "empty-for-attribute-on-textarea-label",
    "description": "Empty for attribute on textarea label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("textarea").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-05",
    "name": "empty-for-attribute-on-select-label",
    "description": "Empty for attribute on select label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("select:not([aria-label])").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-06",
    "name": "empty-for-attribute-on-checkbox-label",
    "description": "Empty for attribute on select label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='checkbox']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='checkbox']:not([aria-label])").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-07",
    "name": "empty-for-attribute-on-radio-label",
    "description": "Empty for attribute on select label",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='radio']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='radio']:not([aria-label])").first().attr("id") + "']").attr("for", "");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "H44-08",
    "name": "change-for-attribute-on-text-input-label",
    "description": "Change for attribute on text input label to non-existant element",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='text']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='text']:not([aria-label])").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-09",
    "name": "change-for-attribute-on-file-input-label",
    "description": "Change for attribute on file input label to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='file']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='file']:not([aria-label])").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-10",
    "name": "change-for-attribute-on-password-input-label",
    "description": "Change for attribute on password input label to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='password']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='password']:not([aria-label])").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-11",
    "name": "change-for-attribute-on-textarea-label",
    "description": "Change for attribute on textarea label to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("textarea").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-12",
    "name": "change-for-attribute-on-select-label",
    "description": "Change for attribute on select label to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("select:not([aria-label])").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-13",
    "name": "change-for-attribute-on-checkbox-label",
    "description": "Change for attribute on select label to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='checkbox']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='checkbox']:not([aria-label])").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-14",
    "name": "change-for-attribute-on-radio-label",
    "description": "Change for attribute on select label to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='radio']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='radio']:not([aria-label])").first().attr("id") + "']").attr("for", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-15",
    "name": "remove-for-attribute-on-text-input-label",
    "description": "Remove for attribute on text input label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='text']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='text']:not([aria-label])").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-16",
    "name": "remove-for-attribute-on-file-input-label",
    "description": "Remove for attribute on file input label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='file']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='file']:not([aria-label])").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-17",
    "name": "remove-for-attribute-on-password-input-label",
    "description": "Remove for attribute on password input label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='password']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='password']:not([aria-label])").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-18",
    "name": "remove-for-attribute-on-textarea-label",
    "description": "Remove for attribute on textarea label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("textarea").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-19",
    "name": "remove-for-attribute-on-select-label",
    "description": "Remove for attribute on select label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("select:not([aria-label])").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-20",
    "name": "remove-for-attribute-on-checkbox-label",
    "description": "Remove for attribute on select label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='checkbox']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='checkbox']:not([aria-label])").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-21",
    "name": "remove-for-attribute-on-radio-label",
    "description": "Remove for attribute on radio label",
    "class": "Attribute Change",
    "subclass": "Remove Attribute",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='radio']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='radio']:not([aria-label])").first().attr("id") + "']").attr("for", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-22",
    "name": "reorder-label-for-text-input",
    "description": "Reorder text input label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='text']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='text']:not([aria-label])").first().attr("id") + "']").insertAfter($("input[type='text']:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-23",
    "name": "reorder-label-for-file-input",
    "description": "Reorder file input label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='file']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='file']:not([aria-label])").first().attr("id") + "']").insertAfter($("input[type='file']:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-24",
    "name": "reorder-label-for-password-input",
    "description": "Reorder password input label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='password']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='password']:not([aria-label])").first().attr("id") + "']").insertAfter($("input[type='password']:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-25",
    "name": "reorder-label-for-textarea",
    "description": "Reorder textarea label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("textarea:not([aria-label])").first().attr("id") + "']").insertAfter($("textarea:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-26",
    "name": "reorder-label-for-select",
    "description": "Reorder select label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("select:not([aria-label])").first().attr("id") + "']").insertAfter($("select:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-27",
    "name": "reorder-label-for-checkbox",
    "description": "Reorder select label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='checkbox']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='checkbox']:not([aria-label])").first().attr("id") + "']").insertBefore($("input[type='checkbox']:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-28",
    "name": "reorder-label-for-radio",
    "description": "Reorder select label",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='radio']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='radio']:not([aria-label])").first().attr("id") + "']").insertBefore($("input[type='radio']:not([aria-label])").first());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-29",
    "name": "remove-label-for-text-input",
    "description": "Remove text input label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='text']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='text']:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-30",
    "name": "remove-label-for-file-input",
    "description": "Remove file input label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='file']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='file']:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-31",
    "name": "remove-label-for-password-input",
    "description": "Remove password input label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='password']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='password']:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-32",
    "name": "remove-label-for-textarea",
    "description": "Remove textarea label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("textarea:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-33",
    "name": "remove-label-for-select",
    "description": "Remove select label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("select:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-34",
    "name": "remove-label-for-checkbox",
    "description": "Remove select label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='checkbox']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='checkbox']:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-35",
    "name": "remove-label-for-radio",
    "description": "Remove select label",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='radio']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='radio']:not([aria-label])").first().attr("id") + "']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-36",
    "name": "empty-label-for-text-input",
    "description": "Empty text input label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='text']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='text']:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-37",
    "name": "empty-label-for-file-input",
    "description": "Empty file input label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='file']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='file']:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-38",
    "name": "empty-label-for-password-input",
    "description": "Empty password input label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='password']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='password']:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-39",
    "name": "empty-label-for-textarea",
    "description": "Empty textarea label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("textarea:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-40",
    "name": "empty-label-for-select",
    "description": "Empty select label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("select:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-41",
    "name": "empty-label-for-checkbox",
    "description": "Empty select label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='checkbox']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='checkbox']:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H44-42",
    "name": "empty-label-for-radio",
    "description": "Empty select label",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H44",
      "successCriterion": ["1.1.1", "1.3.1", "3.3.2", "4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H44.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[type='radio']:not([aria-label])").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for='" + $("input[type='radio']:not([aria-label])").first().attr("id") + "']").html("");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "H45-01",
    "name": "empty-img-longdesc-attribute",
    "description": "Empty longdesc attribute in an image",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "H45",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H45.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[longdesc]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[longdesc]").first().attr("longdesc", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H45-02",
    "name": "change-img-longdesc-attribute",
    "description": "Change longdesc attribute in an image to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "H45",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H45.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[longdesc]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[longdesc]").first().attr("longdesc", "#doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H45-03",
    "name": "empty-img-longdesc",
    "description": "Empty longdesc element of an image",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H45",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H45.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[longdesc]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $($("img[longdesc]").first().attr("longdesc")).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H45-04",
    "name": "remove-img-longdesc",
    "description": "Remove longdesc element of an image",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H45",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H45.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[longdesc]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $($("img[longdesc]").first().attr("longdesc")).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H46-01",
    "name": "remove-noembed",
    "description": "Remove noembed element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "H46",
      "successCriterion": ["1.1.1", "1.2.8"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H46.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("noembed").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("noembed").first().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H48-01",
    "name": "reorder-li-out-of-ol",
    "description": "Reorder ordered list element to outside ol",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H48",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H48.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("ol > li").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("ol > li").last().insertAfter($("ol > li").last().parent());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H48-02",
    "name": "reorder-li-out-of-ul",
    "description": "Reorder unordered list element to outside ul",
    "class": "Element Change",
    "subclass": "Reorder Element",
    "WCAG": {
      "technique": "H48",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H48.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("ul > li").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("ul > li").last().insertAfter($("ul > li").last().parent());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H49-01",
    "name": "change-em-to-span",
    "description": "Change em tag to span tag with appropriate css",
    "class": "Element Change",
    "subclass": "Change Element",
    "WCAG": {
      "technique": "H49",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H49.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("em").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("<span style='font-style: italic;'>" + $("em").last().html() + "</span>").insertAfter($("em").last());
      $("em").last().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H49-02",
    "name": "change-strong-to-span",
    "description": "Change strong tag to span tag with appropriate css",
    "class": "Element Change",
    "subclass": "Change Element",
    "WCAG": {
      "technique": "H49",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H49.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("strong").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("<span style='font-weight: bolder;'>" + $("strong").last().html() + "</span>").insertAfter($("strong").last());
      $("strong").last().remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H53-01",
    "name": "empty-object-inner-html-alternative",
    "description": "Empty the inner HTML of an obejct",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H53",
      "successCriterion": ["1.1.1", "1.2.3", "1.2.8"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H53.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("object").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("object").first().html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "H57-01",
    "name": "change-page-lang-to-non-existant",
    "description": "Change page lang to non-existant",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "H57",
      "successCriterion": ["3.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/H57.html",
    },
    "check": (dom) => {
      const document = dom.window.document;
      if (document.lang) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      const document = dom.window.document;
      $("object").first().html("");
      return mutant_dom.serialize();
    }
  },

]