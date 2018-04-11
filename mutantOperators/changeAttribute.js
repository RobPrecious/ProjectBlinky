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

  {
    "id": "1.1.1-04",
    "name": "empty-aria-label",
    "description": "Buttons should be labeled",
    "class": "Change Attribute",
    "subclass": "Empty Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("button").length && typeof $("button").attr('aria-label') != "undefined") {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button").first().attr('aria-label', "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-05",
    "name": "remove-aria-label",
    "description": "Buttons should be labeled",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("button").length && typeof $("button").attr('aria-label') != "undefined") {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("button").first().attr('aria-label', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-06",
    "name": "empty-area-alt",
    "description": "Ensures <area> elements of image maps have alternate text",
    "class": "Change Attribute",
    "subclass": "Empty Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [{
        "name": "H24",
        "link": "https://www.w3.org/TR/WCAG20-TECHS/H24.html",
      }],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("area").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("area").first().attr('alt', "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-07",
    "name": "remove-area-alt",
    "description": "Ensures <area> elements of image maps have alternate text",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [{
        "name": "H24",
        "link": "https://www.w3.org/TR/WCAG20-TECHS/H24.html",
      }],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("area").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("area").first().attr('alt', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-08",
    "name": "empty-link-text",
    "description": "Remove text from link",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("a").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a").first().html(null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-09",
    "name": "empty-link-aria-label",
    "description": "Empty aria label of link without inner text",
    "class": "Change Attribute",
    "subclass": "Empty Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
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
      $("a[aria-label]").attr('aria-label', '');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-10",
    "name": "change-link-labelledby-nonexistant",
    "description": "Change the aria labelled by to a non existant element",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
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
      $("a[aria-labelledby]").attr('aria-labelledby', 'doesnotexist');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-12",
    "name": "empty-role-link-text",
    "description": "Remove text from element with role='link'",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("span[role='link']").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("span[role='link']").first().html(null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-13",
    "name": "empty-role-link-aria-label",
    "description": "Empty aria label of element with role='link' without inner text",
    "class": "Change Attribute",
    "subclass": "Empty Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("span[role='link'][aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("span[role='link'][aria-label]").first().attr('aria-label', '');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-14",
    "name": "change-role-link-labelledby-nonexistant",
    "description": "Change the aria labelledby of element with role='link' to a non existant element",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("span[role='link'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("span[role='link'][aria-labelledby]").first().attr('aria-labelledby', 'doesnotexist');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-16",
    "name": "remove-object-alt-text",
    "description": "Remove alt text from object element",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
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
      $("object").html('');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.2.2-02",
    "name": "change-audio-caption-source",
    "description": "Change track source to incorrect source on audio element",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("audio track[kind='captions']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("audio track[kind='captions']").attr('src', 'doesnotexist');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.2.3-02",
    "name": "change-video-caption-source",
    "description": "Change caption track from video element to non-existing",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("video track[kind='captions']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("video track[kind='captions']").attr('src', 'doesnotexist');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.2.5-02",
    "name": "change-video-description-source",
    "description": "Remove description track from video element",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("video track[kind='descriptions']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("video track[kind='descriptions']").attr('src', 'doesnotexist');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-01",
    "name": "empty-arc-children",
    "description": "aria-required-children - parent role does not match expected children",
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
      if ($("div[role='list']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("div[role='list']").html("");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-02",
    "name": "change-arc-children-role",
    "description": "aria-required-children - parent role does not match expected children",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("div[role='list']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("div[role='list'] > div[role='listitem']").attr("role", "menuitem");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-04",
    "name": "change-arc-children-role-owns",
    "description": "aria-required-children - parent role does not match expected children",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("div[role='list'][aria-owns]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $('#' + $("div[role='list'][aria-owns]").attr("aria-owns")).attr("role", "menuitem");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-06",
    "name": "change-aria-role",
    "description": "aria-roles - ARIA roles used must conform to valid values",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("div[role='list']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("div[role='list']").attr("role", "lists");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-07",
    "name": "change-avav-role",
    "description": "aria-required-parent - child role does not have expected parent",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("div[aria-live]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("div[aria-live]").attr("aria-live", "invalid");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-11",
    "name": "empty-input-aria-label",
    "description": "Labels - must be structured correctly",
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
      if ($("input[aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[aria-label]").attr("aria-label", "");
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-12",
    "name": "remove-input-aria-label",
    "description": "Labels - must be structured correctly",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[aria-label]").attr("aria-label", null);
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-13",
    "name": "empty-input-aria-labelledby",
    "description": "Labels - must be structured correctly",
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
      if ($("input[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[aria-labelledby]").attr("aria-labelledby", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-14",
    "name": "remove-input-aria-labelledby",
    "description": "Labels - must be structured correctly",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("input[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[aria-labelledby]").attr("aria-labelledby", null);
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-16",
    "name": "empty-select-aria-label",
    "description": "Labels - must be structured correctly",
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
      if ($("select[aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("select[aria-label]").attr("aria-label", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-17",
    "name": "empty-textarea-aria-label",
    "description": "Labels - must be structured correctly",
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
      if ($("textarea[aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("textarea[aria-label]").attr("aria-label", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-18",
    "name": "remove-select-aria-labelledby",
    "description": "Labels - must be structured correctly",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("select[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("select[aria-labelledby]").attr("aria-labelledby", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-19",
    "name": "remove-textarea-aria-labelledby",
    "description": "Labels - must be structured correctly",
    "class": "Change Attribute",
    "subclass": "Remove Attribute",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("textarea[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("textarea[aria-labelledby]").attr("aria-labelledby", null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-21",
    "name": "change-table-role",
    "description": "Change table role to other roles",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
    },
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("table[role='grid']").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("table[role='table']").attr("role", "presentation");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-22",
    "name": "empty-td-header",
    "description": "Empty td header",
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
      if ($("td[headers]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("td[headers]").attr("headers", "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-23",
    "name": "change-td-header",
    "description": "Change td header",
    "class": "Change Attribute",
    "subclass": "Change Attribute Value",
    "WCAG": {
      "principle": "1. Percievable",
      "guideline": "1.1 Text Alternatives",
      "successCriteria": "1.1.1. Non-text Content",
      "level": "A",
      "techniques": [],
      "link": "http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all",
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
      $("td[headers]").attr("headers", "doesnotexist");
      return mutant_dom.serialize();
    }
  },

]