"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = /*#__PURE__*/function () {
  function TitleHelper() {
    _classCallCheck(this, TitleHelper);
  }

  _createClass(TitleHelper, null, [{
    key: "getForElement",
    value: function getForElement(element) {
      if (null !== element) {
        var id = element.id;

        if (id.length > 0) {
          var forElement = document.querySelector('label[for="' + id + '"');

          if (forElement !== null) {
            return forElement;
          }
        }
      }

      return null;
    }
  }, {
    key: "getAttributeFirstChar",
    value: function getAttributeFirstChar(element, attribute) {
      return null !== element && element.getAttribute(attribute) !== null && element.getAttribute(attribute) !== "" && element.getAttribute(attribute).trim().length > 0 && typeof element.getAttribute(attribute).trim()[0] !== 'undefined' ? element.getAttribute(attribute).trim()[0].toLowerCase() : null;
    }
  }, {
    key: "getTextContentFirstChar",
    value: function getTextContentFirstChar(element) {
      return null !== element && typeof element.textContent !== 'undefined' && element.textContent.trim().length > 0 && typeof element.textContent.trim()[0] !== 'undefined' ? element.textContent.trim()[0].toLowerCase() : null;
    }
  }]);

  return TitleHelper;
}();