const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

module.exports = [
  /*{
    "id": "1.1.1-01",
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
  },*/

  {
    "id": "1.1.1-02",
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
    "id": "1.1.1-03",
    "name": "empty-input-image-alt-text",
    "description": "Empty alternative text from <input type='image'> element",
    "class": "Attribute Change",
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("input[type=image]").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("input[type=image]").attr('alt', "");
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-04",
    "name": "remove-input-image-alt-text",
    "description": "Remove alternative text from <input type='image'> element",
    "class": "Attribute Change",
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
    "id": "1.1.1-06",
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
    "id": "1.1.1-07",
    "name": "empty-area-alt",
    "description": "Ensures <area> elements of image maps have alternate text",
    "class": "Attribute Change",
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
    "check": (dom) => {
      let $ = require('jquery')(dom.window);

      if ($("a").length) {
        return true;
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      $("a").html(null);
      return mutant_dom.serialize();
    }
  },

  {
    "id": "1.1.1-10",
    "name": "empty-link-aria-label",
    "description": "Empty aria label of link without inner text",
    "class": "Attribute Change",
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
    "check": (dom) => {
      let $ = require('jquery')(dom.window);
      if ($("dt").length) {
        return true
      }
      return false;
    },
    "mutation": (mutant_dom) => {
      let $ = require('jquery')(mutant_dom.window);
      let dt = $("dt");
      dt.insertBefore(dt.parent());
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