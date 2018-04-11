const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [

  {
    "id": "1.1.1-11",
    "name": "change-link-labelledby-invalid",
    "description": "Change the aria labelled by element to a invalid element",
    "class": "Change Element",
    "subclass": "Empty Linked Element",
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
      $('#' + $("a[aria-labelledby]").first().attr('aria-labelledby')).html('');
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.1.1-15",
    "name": "change-role-link-labelledby-invalid",
    "description": "Change the aria labelledby of element with role='link' to a invalid element",
    "class": "Change Element",
    "subclass": "Empty Linked Element",
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
      $('#' + $("span[role='link'][aria-labelledby]").first().attr('aria-labelledby')).html('');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.2.2-01",
    "name": "remove-audio-caption",
    "description": "Remove caption track from audio element",
    "class": "Change Element",
    "subclass": "Remove Element",
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
      $("audio track[kind='captions']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.2.3-01",
    "name": "remove-video-caption",
    "description": "Remove caption track from video element",
    "class": "Change Element",
    "subclass": "Remove Element",
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
      $("video track[kind='captions']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.2.5-01",
    "name": "remove-video-description",
    "description": "Remove description track from video element",
    "class": "Change Element",
    "subclass": "Remove Element",
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
      $("video track[kind='descriptions']").remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-03",
    "name": "empty-arc-children-owns",
    "description": "aria-required-children - parent role does not match expected children",
    "class": "Change Element",
    "subclass": "Remove Element",
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
      $('#' + $("div[role='list'][aria-owns]").attr("aria-owns")).remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.1-05",
    "name": "remove-arp-parent",
    "description": "aria-required-parent - certain ARIA roles must be contained by particular parents",
    "class": "Change Element",
    "subclass": "Remove Element",
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
      $("div[role='list'][aria-owns]").remove();
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-08",
    "name": "reorder-definition-list",
    "description": "definition-list - must be structured correctly",
    "class": "Change Element",
    "subclass": "Reorder Element",
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
  },

  {
    "id": "1.3.1-09",
    "name": "reorder-ordered-list",
    "description": "Ordered-list - must be structured correctly",
    "class": "Change Element",
    "subclass": "Reorder Element",
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
      if ($("ol").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let ol = $("ol > li").first();
      ol.insertBefore(ol.parent());
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-10",
    "name": "reorder-unordered-list",
    "description": "Unordered-list - must be structured correctly",
    "class": "Change Element",
    "subclass": "Reorder Element",
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
      if ($("ol").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let li = $("ul > li").first();
      li.insertBefore(li.parent());
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.1-15",
    "name": "remove-input-aria-labelfor",
    "description": "Labels - must be structured correctly",
    "class": "Change Element",
    "subclass": "Remove Element",
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
      if ($("label[for]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("label[for]").remove();
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.3.2-01",
    "name": "reorder-heading1-order",
    "description": "Change heading order",
    "class": "Change Element",
    "subclass": "Reorder Element",
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
      if ($("h1").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let h1 = $("h1").first();
      h1.insertAfter(h1.next());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-02",
    "name": "reorder-heading2-order",
    "description": "Change heading order",
    "class": "Change Element",
    "subclass": "Reorder Element",
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
      if ($("h2").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let h2 = $("h2").first();
      h2.insertBefore(h2.prev());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-03",
    "name": "reorder-heading3-order",
    "description": "Change heading order",
    "class": "Change Element",
    "subclass": "Reorder Element",
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
      if ($("h3").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let h3 = $("h3").first();
      h3.insertBefore(h3.prev());
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-04",
    "name": "change-h1-to-h2",
    "description": "Change heading tag -  h1 -> h2",
    "class": "Change Element",
    "subclass": "Change Element Tag",
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
      if ($("h1").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let heading = $("h1").first();
      let newHeading = "<h2>" + heading.innerHTML + "</h2>";
      heading.insertAfter(newHeading);
      heading.remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-05",
    "name": "change-h2-to-h3",
    "description": "Change heading tag -  h2 -> h3",
    "class": "Change Element",
    "subclass": "Change Element Tag",
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
      if ($("h2").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let heading = $("h2").first();
      let newHeading = "<h3>" + heading.innerHTML + "</h3>";
      heading.insertAfter(newHeading);
      heading.remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-06",
    "name": "change-h3-to-h4",
    "description": "Change heading tag -  h3 -> h4",
    "class": "Change Element",
    "subclass": "Change Element Tag",
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
      if ($("h3").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let heading = $("h3").first();
      let newHeading = "<h4>" + heading.innerHTML + "</h4>";
      heading.insertAfter(newHeading);
      heading.remove();
      return mutant_dom.serialize();
    }
  },



  {
    "id": "1.3.2-07",
    "name": "change-h2-to-h1",
    "description": "Change heading tag -  h2 -> h1",
    "class": "Change Element",
    "subclass": "Change Element Tag",
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
      if ($("h2").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let heading = $("h2").first();
      let newHeading = "<h1>" + heading.innerHTML + "</h1>";
      heading.insertAfter(newHeading);
      heading.remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-08",
    "name": "change-h3-to-h2",
    "description": "Change heading tag -  h3 -> h2",
    "class": "Change Element",
    "subclass": "Change Element Tag",
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
      if ($("h3").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let heading = $("h3").first();
      let newHeading = "<h2>" + heading.innerHTML + "</h2>";
      heading.insertAfter(newHeading);
      heading.remove();
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.3.2-09",
    "name": "change-h4-to-h3",
    "description": "Change heading tag -  h4 -> h3",
    "class": "Change Element",
    "subclass": "Change Element Tag",
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
      if ($("h4").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let heading = $("h4").first();
      let newHeading = "<h3>" + heading.innerHTML + "</h3>";
      heading.insertAfter(newHeading);
      heading.remove();
      return mutant_dom.serialize();
    }
  },



]