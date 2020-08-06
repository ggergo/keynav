"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = /*#__PURE__*/function () {
  _createClass(ScopeInterface, null, [{
    key: Symbol.hasInstance,
    value: function value(obj) {
      var hasMethod = function hasMethod(obj, methodName) {
        return methodName in obj && typeof obj[methodName] === 'function';
      };

      if (hasMethod(obj, 'getSuperKey') && hasMethod(obj, 'getSuperSelectors') && hasMethod(obj, 'addSuperSelector') && hasMethod(obj, 'removeSuperSelector') && hasMethod(obj, 'getTargetSelectors') && hasMethod(obj, 'addTargetSelector') && hasMethod(obj, 'removeTargetSelector') && hasMethod(obj, 'getTargetElement') && hasMethod(obj, 'toString')) {
        return true;
      }
    }
  }]);

  function ScopeInterface(superKey, superSelectors) {
    var targetSelectors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, ScopeInterface);
  }

  _createClass(ScopeInterface, [{
    key: "getSuperKey",
    value: function getSuperKey() {}
  }, {
    key: "toString",
    value: function toString() {} // returns getSuperkey()

  }, {
    key: "getSuperSelectors",
    value: function getSuperSelectors() {}
  }, {
    key: "getTargetSelectors",
    value: function getTargetSelectors() {}
  }, {
    key: "addSuperSelector",
    value: function addSuperSelector(selector) {}
  }, {
    key: "removeSuperSelector",
    value: function removeSuperSelector(selector) {}
  }, {
    key: "addTargetSelector",
    value: function addTargetSelector(selector) {}
  }, {
    key: "removeTargetSelector",
    value: function removeTargetSelector(selector) {}
  }, {
    key: "getTargetElement",
    value: function getTargetElement(targetKey, currentElement) {}
  }]);

  return ScopeInterface;
}();