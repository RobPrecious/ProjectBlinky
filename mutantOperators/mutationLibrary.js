const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

const changeAttribute = require('./changeAttribute');
const reorderElement = require('./reorderElement');


module.exports = [
  ...changeAttribute,
  //...reorderElement,
];


existing = [



  {
    "id": "1.1.1-04",
    "name": "remove-input-image-alt-text",
    "description": "Remove alternative text from <input type='image'> element",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("input[type=image]").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type=image]").attr('alt', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-05",
    "name": "empty-aria-label",
    "description": "Buttons should be labeled",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
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
  }, {
    "id": "1.1.1-06",
    "name": "remove-aria-label",
    "description": "Buttons should be labeled",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
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
    "id": "1.1.1-07",
    "name": "empty-area-alt",
    "description": "Ensures <area> elements of image maps have alternate text",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("area").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("area").attr('alt', "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-08",
    "name": "remove-area-alt",
    "description": "Ensures <area> elements of image maps have alternate text",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("area").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("area").attr('alt', null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-09",
    "name": "empty-link-text",
    "description": "Remove text from link",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
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
    "id": "1.1.1-10",
    "name": "empty-link-aria-label",
    "description": "Empty aria label of link without inner text",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
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
    "id": "1.1.1-11",
    "name": "change-link-labelledby-nonexistant",
    "description": "Change the aria labelled by to a non existant element",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
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
    "name": "change-link-labelledby-invalid",
    "description": "Change the aria labelled by element to a invalid element",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("a[aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $('#' + $("a[aria-labelledby]").attr('aria-labelledby')).html('');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-13",
    "name": "empty-role-link-text",
    "description": "Remove text from element with role='link'",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("span[role='link']").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("span[role='link']").html(null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-14",
    "name": "empty-role-link-aria-label",
    "description": "Empty aria label of element with role='link' without inner text",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("span[role='link'][aria-label]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("span[role='link'][aria-label]").attr('aria-label', '');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-15",
    "name": "change-role-link-labelledby-nonexistant",
    "description": "Change the aria labelledby of element with role='link' to a non existant element",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("span[role='link'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("span[role='link'][aria-labelledby]").attr('aria-labelledby', 'doesnotexist');
      return mutant_dom.serialize();
    }
  },


  {
    "id": "1.1.1-16",
    "name": "change-role-link-labelledby-invalid",
    "description": "Change the aria labelledby of element with role='link' to a invalid element",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("span[role='link'][aria-labelledby]").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $('#' + $("span[role='link'][aria-labelledby]").attr('aria-labelledby')).html('');
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-17",
    "name": "remove-object-alt-text",
    "description": "Remove alt text from object element",
    "class": "Attribute Change",
    "successCriteria": "1.1.1",
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
    "id": "1.2.2-01",
    "name": "remove-audio-caption",
    "description": "Remove caption track from audio element",
    "class": "Remove Element",
    "successCriteria": "1.2.2",
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
    "id": "1.2.2-02",
    "name": "change-audio-caption-source",
    "description": "Change track source to incorrect source on audio element",
    "class": "Attribute Change",
    "successCriteria": "1.2.2",
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
    "id": "1.2.3-01",
    "name": "remove-video-caption",
    "description": "Remove caption track from video element",
    "class": "Remove Element",
    "successCriteria": "1.2.3",
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
    "id": "1.2.3-02",
    "name": "change-video-caption-source",
    "description": "Remove caption track from video element",
    "class": "Attribute Change",
    "successCriteria": "1.2.3",
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
    "id": "1.2.5-01",
    "name": "remove-video-description",
    "description": "Remove description track from video element",
    "class": "Remove Element",
    "successCriteria": "1.2.5",
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
    "id": "1.2.5-02",
    "name": "change-video-description-source",
    "description": "Remove description track from video element",
    "class": "Attribute Change",
    "successCriteria": "1.2.5",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-03",
    "name": "empty-arc-children-owns",
    "description": "aria-required-children - parent role does not match expected children",
    "class": "Remove Element",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-04",
    "name": "change-arc-children-role-owns",
    "description": "aria-required-children - parent role does not match expected children",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-05",
    "name": "remove-arp-parent",
    "description": "aria-required-parent - certain ARIA roles must be contained by particular parents",
    "class": "Remove Element",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-06",
    "name": "change-aria-role",
    "description": "aria-roles - ARIA roles used must conform to valid values",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
  },

  {
    "id": "1.3.1-09",
    "name": "reorder-ordered-list",
    "description": "Ordered-list - must be structured correctly",
    "class": "Reorder Element",
    "successCriteria": "1.3.1",
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
    "class": "Reorder Element",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-11",
    "name": "empty-input-aria-label",
    "description": "Labels - must be structured correctly",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
  }, {
    "id": "1.3.1-12",
    "name": "remove-input-aria-label",
    "description": "Labels - must be structured correctly",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-15",
    "name": "remove-input-aria-labelfor",
    "description": "Labels - must be structured correctly",
    "class": "Remove Element",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-16",
    "name": "empty-select-aria-label",
    "description": "Labels - must be structured correctly",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-20",
    "name": "change-p-as-heading",
    "description": "Paragraph elements should not be styled as headers",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "id": "1.3.1-21",
    "name": "change-table-role",
    "description": "Change table role to other roles",
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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
    "class": "Attribute Change",
    "successCriteria": "1.3.1",
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

  {
    "id": "1.3.2-01",
    "name": "reorder-heading1-order",
    "description": "Change heading order",
    "class": "Reorder Element",
    "successCriteria": "1.3.2",
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
    "class": "Reorder Element",
    "successCriteria": "1.3.2",
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
    "class": "Reorder Element",
    "successCriteria": "1.3.2",
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
    "class": "Change element tag",
    "successCriteria": "1.3.2",
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
    "class": "Change element tag",
    "successCriteria": "1.3.2",
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
    "class": "Change element tag",
    "successCriteria": "1.3.2",
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
    "class": "Change element tag",
    "successCriteria": "1.3.2",
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
    "class": "Change element tag",
    "successCriteria": "1.3.2",
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
    "class": "Change element tag",
    "successCriteria": "1.3.2",
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

  {
    "id": "2.4.2-01",
    "name": "empty-title",
    "description": "Empty title",
    "class": "Attribute Change",
    "successCriteria": "1.3.2",
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



  /*

        {
          "id": 7,
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
          "id": 8,
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
        },*/
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