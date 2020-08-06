"use strict";

var _scopes, _scopeState, _notReceivingSelectors, _fnListener, _isExpectingSuperKey, _isSuperKeyPressValid, _temp, _isExpectingSuperKey2, _isSuperKeyPressValid2;

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

var ScopeInterface = require('./scopeInterface');

var _require = require('uuid'),
    uuidv4 = _require.v4;

module.exports = (_temp = (_scopes = new WeakMap(), _scopeState = new WeakMap(), _notReceivingSelectors = new WeakMap(), _fnListener = new WeakMap(), _isExpectingSuperKey = new WeakSet(), _isSuperKeyPressValid = new WeakSet(), /*#__PURE__*/function () {
  function Keynav() {
    var _this = this;

    _classCallCheck(this, Keynav);

    _isSuperKeyPressValid.add(this);

    _isExpectingSuperKey.add(this);

    _scopes.set(this, {
      writable: true,
      value: []
    });

    _scopeState.set(this, {
      writable: true,
      value: null
    });

    _notReceivingSelectors.set(this, {
      writable: true,
      value: []
    });

    _defineProperty(this, "listeningTimeMS", 2000);

    _fnListener.set(this, {
      writable: true,
      value: function value(event) {
        if (_classPrivateMethodGet(_this, _isExpectingSuperKey, _isExpectingSuperKey2).call(_this)) {
          if (_classPrivateMethodGet(_this, _isSuperKeyPressValid, _isSuperKeyPressValid2).call(_this, event.key)) {
            var tmpScopeState = {
              'superKey': event.key,
              'r': uuidv4()
            };

            _classPrivateFieldSet(_this, _scopeState, tmpScopeState);

            setTimeout(function () {
              if (_classPrivateFieldGet(_this, _scopeState) === tmpScopeState) {
                _classPrivateFieldSet(_this, _scopeState, null);
              }
            }, _this.listeningTimeMS);
          }
        } else {
          var scope = _this.getScope(_classPrivateFieldGet(_this, _scopeState).superKey);

          _classPrivateFieldSet(_this, _scopeState, null);

          if (scope) {
            var targetElement = scope.getTargetElement(event.key, document.activeElement);

            if (targetElement) {
              targetElement.focus();
            }
          }
        }
      }
    });

    this.init();
  }

  _createClass(Keynav, [{
    key: "init",
    value: function init() {
      _classPrivateFieldSet(this, _scopes, []);

      _classPrivateFieldSet(this, _scopeState, null);

      _classPrivateFieldSet(this, _notReceivingSelectors, ['input[type="text"]', 'input[type="date"]', 'input[type="datetime-local"]', 'input[type="email"]', 'input[type="month"]', 'input[type="number"]', 'input[type="password"]', 'input[type="search"]', 'input[type="tel"]', 'input[type="time"]', 'input[type="url"]', 'input[type="week"]', 'textarea', '[contenteditable="true"]']);

      this.listeningTimeMS = 2000;
      this.removeEventListener();
      this.addEventListener();
    }
  }, {
    key: "clearNotReceivingSelectors",
    value: function clearNotReceivingSelectors() {
      _classPrivateFieldSet(this, _notReceivingSelectors, []);
    }
  }, {
    key: "addNotReceivingSelector",
    value: function addNotReceivingSelector(selector) {
      if (-1 === _classPrivateFieldGet(this, _notReceivingSelectors).indexOf(selector)) {
        _classPrivateFieldGet(this, _notReceivingSelectors).push(selector);
      }
    }
  }, {
    key: "removeNotReceivingSelector",
    value: function removeNotReceivingSelector(selector) {
      var index = _classPrivateFieldGet(this, _notReceivingSelectors).indexOf(selector);

      if (-1 !== index) {
        _classPrivateFieldGet(this, _notReceivingSelectors).splice(index, 1);
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      document.addEventListener("keyup", _classPrivateFieldGet(this, _fnListener));
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      document.removeEventListener("keyup", _classPrivateFieldGet(this, _fnListener));
    }
  }, {
    key: "addScope",
    value: function addScope(newScope) {
      if (!(newScope instanceof ScopeInterface)) {
        return false;
      }

      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _scopes)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var scope = _step.value;

          if (scope.toString() === newScope.toString()) {
            console.log('scope already exists');
            return false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      _classPrivateFieldGet(this, _scopes).push(newScope);
    }
  }, {
    key: "removeScope",
    value: function removeScope(scopeString) {
      for (var index in _classPrivateFieldGet(this, _scopes)) {
        if (scopeString === _classPrivateFieldGet(this, _scopes)[index].toString()) {
          _classPrivateFieldGet(this, _scopes).splice(index, 1);

          break;
        }
      }
    }
  }, {
    key: "getScope",
    value: function getScope(scopeString) {
      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _scopes)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var scope = _step2.value;

          if (scopeString === scope.toString()) {
            return scope;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return null;
    }
  }, {
    key: "listeningTimeMS",
    get: function get() {
      return this.listeningTimeMS;
    },
    set: function set(listeningTimeMS) {
      this.listeningTimeMS = listeningTimeMS;
    }
  }]);

  return Keynav;
}()), _isExpectingSuperKey2 = function _isExpectingSuperKey2() {
  return null === _classPrivateFieldGet(this, _scopeState);
}, _isSuperKeyPressValid2 = function _isSuperKeyPressValid2(key) {
  return !document.activeElement.matches(_classPrivateFieldGet(this, _notReceivingSelectors).join(',')) && 0 < _classPrivateFieldGet(this, _scopes).filter(function (obj) {
    return obj.toString() === key;
  }).length;
}, _temp);