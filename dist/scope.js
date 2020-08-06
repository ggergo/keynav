"use strict";

var _superKey, _superSelectors, _targetSelectors, _getSuperElements, _getPossibleTargetElements, _temp, _getSuperElements2, _getPossibleTargetElements2;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var TitleHelper = require('./titleHelper');

module.exports = (_temp = (_superKey = new WeakMap(), _superSelectors = new WeakMap(), _targetSelectors = new WeakMap(), _getSuperElements = new WeakSet(), _getPossibleTargetElements = new WeakSet(), /*#__PURE__*/function () {
  function Scope(superKey, superSelectors) {
    _classCallCheck(this, Scope);

    _getPossibleTargetElements.add(this);

    _getSuperElements.add(this);

    _superKey.set(this, {
      writable: true,
      value: void 0
    });

    _superSelectors.set(this, {
      writable: true,
      value: []
    });

    _targetSelectors.set(this, {
      writable: true,
      value: []
    });

    _defineProperty(this, "fnGetTargetKey", function (element) {
      if (typeof element.dataset.keynavKey !== 'undefined') {
        return element.dataset.keynavKey;
      }

      var forEl = TitleHelper.getForElement(element);

      if (null !== forEl) {
        element = forEl;
      }

      var placeholder = TitleHelper.getAttributeFirstChar(element, 'placeholder');

      if (null !== placeholder) {
        return placeholder;
      }

      return TitleHelper.getTextContentFirstChar(element);
    });

    _defineProperty(this, "fnSortPossibleTargetElements", function (a, b) {
      if (a.getAttribute('tabIndex') === b.getAttribute('tabIndex')) {
        return 0;
      }

      if (null === a.getAttribute('tabIndex')) {
        return 1;
      }

      if (null === b.getAttribute('tabIndex')) {
        return -1;
      }

      if (a.getAttribute('tabIndex') < b.getAttribute('tabIndex')) {
        return -1;
      }

      return 1;
    });

    _classPrivateFieldSet(this, _superKey, superKey);

    if (typeof superSelectors === 'string') {
      superSelectors = [superSelectors];
    }

    var _iterator = _createForOfIteratorHelper(superSelectors),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var ss = _step.value;
        this.addSuperSelector(ss);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var targetSelectors = ['input:not([tabindex="-1"]):not([disabled])', 'select:not([tabindex="-1"]):not([disabled])', 'textarea:not([tabindex="-1"]):not([disabled])', 'a:not([tabindex="-1"])[href]', 'button:not([tabindex="-1"]):not([disabled])', 'area:not([tabindex="-1"])[href]', '*:not([tabindex="-1"])[contenteditable="true"]', '*:not([tabindex="-1"])[tabindex]', '*:not([tabindex="-1"])[autofocus]'];

    for (var _i = 0, _targetSelectors2 = targetSelectors; _i < _targetSelectors2.length; _i++) {
      var ts = _targetSelectors2[_i];
      this.addTargetSelector(ts);
    }
  }

  _createClass(Scope, [{
    key: "getSuperKey",
    value: function getSuperKey() {
      return _classPrivateFieldGet(this, _superKey);
    }
  }, {
    key: "getSuperSelectors",
    value: function getSuperSelectors() {
      return _classPrivateFieldGet(this, _superSelectors);
    }
  }, {
    key: "getTargetSelectors",
    value: function getTargetSelectors() {
      return _classPrivateFieldGet(this, _targetSelectors);
    }
  }, {
    key: "addSuperSelector",
    value: function addSuperSelector(selector) {
      if (-1 === _classPrivateFieldGet(this, _superSelectors).indexOf(selector)) {
        _classPrivateFieldGet(this, _superSelectors).push(selector);
      }
    }
  }, {
    key: "clearTargetSelectors",
    value: function clearTargetSelectors() {
      _classPrivateFieldSet(this, _targetSelectors, []);
    }
  }, {
    key: "addTargetSelector",
    value: function addTargetSelector(selector) {
      if (-1 === _classPrivateFieldGet(this, _targetSelectors).indexOf(selector)) {
        _classPrivateFieldGet(this, _targetSelectors).push(selector);
      }
    }
  }, {
    key: "removeSuperSelector",
    value: function removeSuperSelector(selector) {
      var index = _classPrivateFieldGet(this, _superSelectors).indexOf(selector);

      if (-1 !== index) {
        _classPrivateFieldGet(this, _superSelectors).splice(index, 1);
      }
    }
  }, {
    key: "removeTargetSelector",
    value: function removeTargetSelector(selector) {
      var index = _classPrivateFieldGet(this, _targetSelectors).indexOf(selector);

      if (-1 !== index) {
        _classPrivateFieldGet(this, _targetSelectors).splice(index, 1);
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.getSuperKey();
    }
  }, {
    key: "getTargetElement",
    value: function getTargetElement(targetKey, currentElement) {
      var onlyVisible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var isBeyondCurrent = false;
      var firstElement = null;

      var _iterator2 = _createForOfIteratorHelper(_classPrivateMethodGet(this, _getPossibleTargetElements, _getPossibleTargetElements2).call(this, onlyVisible)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var possibleTargetElement = _step2.value;

          if (this.fnGetTargetKey(possibleTargetElement) === targetKey) {
            if (null === firstElement) {
              firstElement = possibleTargetElement;
            }

            if (isBeyondCurrent) {
              return possibleTargetElement;
            }
          }

          if (possibleTargetElement.isSameNode(currentElement)) {
            isBeyondCurrent = true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (null !== firstElement) {
        return firstElement;
      }

      return null;
    }
  }]);

  return Scope;
}()), _getSuperElements2 = function _getSuperElements2() {
  return _toConsumableArray(document.querySelectorAll(_classPrivateFieldGet(this, _superSelectors).join(',')));
}, _getPossibleTargetElements2 = function _getPossibleTargetElements2(onlyVisible) {
  var possibleTarget = [];

  var _iterator3 = _createForOfIteratorHelper(_classPrivateMethodGet(this, _getSuperElements, _getSuperElements2).call(this)),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var superElement = _step3.value;
      var queryEls = superElement.querySelectorAll(_classPrivateFieldGet(this, _targetSelectors).join(','));
      queryEls = _toConsumableArray(queryEls);

      if (onlyVisible) {
        // only visibles since there is no native css selector
        queryEls = queryEls.filter(function (filEl) {
          return filEl.offsetParent !== null;
        });
      } // merge


      possibleTarget = _toConsumableArray(new Set([].concat(_toConsumableArray(possibleTarget), _toConsumableArray(queryEls))));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return possibleTarget.sort(this.fnSortPossibleTargetElements);
}, _temp);