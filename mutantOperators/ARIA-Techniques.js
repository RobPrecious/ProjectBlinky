const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [

  {
    "id": "ARIA01-01",
    "name": "empty-aria-describedby-attribute",
    "description": "Empty aria-describedby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA1",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-describedby]:not(img)").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[aria-describedby]:not(img)").first().attr("aria-describedby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA01-02",
    "name": "change-aria-describedby-attribute",
    "description": "Change aria-describedby attribute to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA1",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-describedby]:not(img)").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[aria-describedby]:not(img)").first().attr("aria-describedby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA01-03",
    "name": "remove-aria-describedby-element",
    "description": "Remove aria-describedby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA1",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-describedby]:not(img)").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[aria-describedby]:not(img)").first().attr("aria-describedby")).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA02-01",
    "name": "empty-aria-required-attribute",
    "description": "Empty aria-required attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA2",
      "successCriterion": ["1.3.1", "3.3.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA2.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-required]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[aria-required]").first().attr("aria-required", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA02-02",
    "name": "change-aria-required-attribute",
    "description": "Change aria-required attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA2",
      "successCriterion": ["1.3.1", "3.3.3"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA2.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-required]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[aria-required]").first().attr("aria-required", "InvalidValue");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA04-01",
    "name": "empty-role-attribute",
    "description": "Empty role attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA4",
      "successCriterion": ["4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role]").last().attr("role", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA04-02",
    "name": "change-role-attribute",
    "description": "Change role attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA4",
      "successCriterion": ["4.1.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA4.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role]").last().attr("role", "InvalidValue");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA06-01",
    "name": "empty-aria-label-attribute",
    "description": "Empty aria-label attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA6",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA6.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-label]:not(a)").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[aria-label]:not(a)").last().attr("aria-label", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA07-01",
    "name": "empty-link-aria-labelledby-attribute",
    "description": "Empty link aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA7",
      "successCriterion": ["2.4.4"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a[aria-labelledby]").last().attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA07-02",
    "name": "change-link-aria-labelledby-attribute",
    "description": "Change link aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA7",
      "successCriterion": ["2.4.4"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a[aria-labelledby]").last().attr("aria-labelledby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA07-03",
    "name": "empty-link-aria-labelledby-element",
    "description": "Empty link aria-labelledby element",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "ARIA7",
      "successCriterion": ["2.4.4"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("a[aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA07-04",
    "name": "remove-link-aria-labelledby-element",
    "description": "Remove link aria-labelledby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA7",
      "successCriterion": ["2.4.4"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA7.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("a[aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA08-01",
    "name": "empty-link-aria-label-attribute",
    "description": "Empty link aria-label attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA8",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA8.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a[aria-label]").last().attr("aria-label", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA09-01",
    "name": "empty-aria-labelledby-attribute",
    "description": "Empty aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA9",
      "successCriterion": ["1.1.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA9.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-labelledby]").length) {
        for (let i = 0; i < $("[aria-labelledby]").length; i++) {
          if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
            return true;
          }
        }
        return false;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let element;
      for (let i = 0; i < $("[aria-labelledby]").length; i++) {
        if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
          element = $($("[aria-labelledby]").get(i));
          break;
        }
      }
      element.attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA09-02",
    "name": "change-aria-labelledby-attribute",
    "description": "Change aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA9",
      "successCriterion": ["1.1.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA9.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-labelledby]").length) {
        for (let i = 0; i < $("[aria-labelledby]").length; i++) {
          if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
            return true;
          }
        }
        return false;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let element;
      for (let i = 0; i < $("[aria-labelledby]").length; i++) {
        if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
          element = $($("[aria-labelledby]").get(i));
          break;
        }
      }
      element.attr("aria-labelledby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA09-03",
    "name": "empty-aria-labelledby-element",
    "description": "Empty aria-labelledby element",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "ARIA9",
      "successCriterion": ["1.1.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA9.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-labelledby]").length) {
        for (let i = 0; i < $("[aria-labelledby]").length; i++) {
          if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
            return true;
          }
        }
        return false;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let element;
      for (let i = 0; i < $("[aria-labelledby]").length; i++) {
        if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
          element = $($("[aria-labelledby]").get(i));
          break;
        }
      }
      $("#" + element.attr("aria-labelledby").split(" ")[0]).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA09-04",
    "name": "remove-aria-labelledby-element",
    "description": "Remove aria-labelledby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA9",
      "successCriterion": ["1.1.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA9.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[aria-labelledby]").length) {
        for (let i = 0; i < $("[aria-labelledby]").length; i++) {
          if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
            return true;
          }
        }
        return false;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let element;
      for (let i = 0; i < $("[aria-labelledby]").length; i++) {
        if ($($("[aria-labelledby]").get(i)).attr("aria-labelledby").split(" ").length > 1) {
          element = $($("[aria-labelledby]").get(i));
          break;
        }
      }
      $("#" + element.attr("aria-labelledby").split(" ")[0]).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA10-01",
    "name": "empty-role-image-aria-labelledby-attribute",
    "description": "Empty aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA10",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA10.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role='img'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role='img'][aria-labelledby]").last().attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA10-02",
    "name": "change-role-image-aria-labelledby-attribute",
    "description": "Change aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA10",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA10.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role='img'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role='img'][aria-labelledby]").last().attr("aria-labelledby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA10-03",
    "name": "empty-role-image-aria-labelledby-element",
    "description": "Empty aria-labelledby element",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "ARIA10",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA10.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role='img'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[role='img'][aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA10-04",
    "name": "remove-role-image-aria-labelledby-element",
    "description": "Remove aria-labelledby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA10",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA10.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role='img'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[role='img'][aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA12-01",
    "name": "empty-role-heading-aria-level-attribute",
    "description": "Empty heading role aria-level attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA12",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA12.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role='heading'][aria-level]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role='heading'][aria-level]").last().attr("aria-level", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA12-02",
    "name": "change-role-heading-aria-level-attribute",
    "description": "Change heading role aria-level attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA12",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA12.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role='heading'][aria-level]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role='heading'][aria-level]").last().attr("aria-level", "invalidValue");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "ARIA13-01",
    "name": "empty-region-aria-labelledby-attribute",
    "description": "Empty region aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA13",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA13.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role][aria-labelledby]").last().attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA13-02",
    "name": "change-region-aria-labelledby-attribute",
    "description": "Change region aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA13",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA13.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role][aria-labelledby]").last().attr("aria-labelledby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA13-03",
    "name": "empty-region-aria-labelledby-element",
    "description": "Empty region aria-labelledby element",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "ARIA13",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA13.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[role][aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA13-04",
    "name": "remove-region-aria-labelledby-element",
    "description": "Remove region aria-labelledby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA13",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA13.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[role][aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA15-01",
    "name": "empty-img-aria-describedby-attribute",
    "description": "Empty image aria-describedby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA15",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA15.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[aria-describedby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[aria-describedby]").first().attr("aria-describedby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA15-02",
    "name": "change-img-aria-describedby-attribute",
    "description": "Change image aria-describedby attribute to non-existant",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA15",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA15.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[aria-describedby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("img[aria-describedby]").first().attr("aria-describedby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA15-03",
    "name": "remove-img-aria-describedby-element",
    "description": "Remove image aria-describedby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA15",
      "successCriterion": ["1.1.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA15.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("img[aria-describedby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("img[aria-describedby]").first().attr("aria-describedby")).remove();
      return mutant_dom.serialize();
    }
  },


  {
    "id": "ARIA16-01",
    "name": "empty-ui-aria-labelledby-attribute",
    "description": "Empty ui aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA16",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA16.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[aria-labelledby], select[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[aria-labelledby], select[aria-labelledby]").last().attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA16-02",
    "name": "change-ui-aria-labelledby-attribute",
    "description": "Change ui aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA16",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA16.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[aria-labelledby], select[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[aria-labelledby], select[aria-labelledby]").last().attr("aria-labelledby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA16-03",
    "name": "empty-ui-aria-labelledby-element",
    "description": "Empty ui aria-labelledby element",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "ARIA16",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA16.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[aria-labelledby], select[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("input[aria-labelledby], select[aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA16-04",
    "name": "remove-ui-aria-labelledby-element",
    "description": "Remove ui aria-labelledby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA16",
      "successCriterion": ["1.3.1"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA16.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[aria-labelledby], select[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("input[aria-labelledby], select[aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).remove();
      return mutant_dom.serialize();
    }
  },



  {
    "id": "ARIA17-01",
    "name": "empty-group-aria-labelledby-attribute",
    "description": "Empty group aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Empty Attribute",
    "WCAG": {
      "technique": "ARIA17",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA17.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role*='group'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role*='group'][aria-labelledby]").last().attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA17-02",
    "name": "change-group-aria-labelledby-attribute",
    "description": "Change group aria-labelledby attribute",
    "class": "Attribute Change",
    "subclass": "Change Attribute",
    "WCAG": {
      "technique": "ARIA17",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA17.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role*='group'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("[role*='group'][aria-labelledby]").last().attr("aria-labelledby", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA17-03",
    "name": "empty-group-aria-labelledby-element",
    "description": "Empty group aria-labelledby element",
    "class": "Element Change",
    "subclass": "Empty Element",
    "WCAG": {
      "technique": "ARIA17",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA17.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role*='group'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[role*='group'][aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "ARIA17-04",
    "name": "remove-group-aria-labelledby-element",
    "description": "Remove group aria-labelledby element",
    "class": "Element Change",
    "subclass": "Remove Element",
    "WCAG": {
      "technique": "ARIA17",
      "successCriterion": ["1.3.1", "3.3.2"],
      "link": "https://www.w3.org/TR/WCAG20-TECHS/ARIA17.html",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("[role*='group'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("#" + $("[role*='group'][aria-labelledby]").last().attr("aria-labelledby").split(" ")[0]).remove();
      return mutant_dom.serialize();
    }
  },

]