"use strict";

var targetReturnElement = {
  focus: jest.fn()
};
var mockTargetElement = jest.fn(function () {
  return targetReturnElement;
});
var Scope = jest.fn(function () {
  return {
    getTargetElement: mockTargetElement,
    toString: function toString() {
      return 'm';
    },
    getSuperKey: function getSuperKey() {
      return 'm';
    },
    getSuperSelectors: function getSuperSelectors() {
      return ['.menu'];
    },
    getTargetSelectors: function getTargetSelectors() {
      return ['a'];
    },
    addSuperSelector: function addSuperSelector() {},
    removeSuperSelector: function removeSuperSelector() {},
    addTargetSelector: function addTargetSelector() {},
    removeTargetSelector: function removeTargetSelector() {}
  };
});

var ks = require('./keynavSingleton');

var Keynav = require('./keynav');

var each = require('jest-each')["default"];

beforeEach(function () {
  document.body.innerHTML = '<ul class="menu">' + '    <li><a tabindex="10" id="mHome" href="#">Home</a><li/>' + '    <li><a tabindex="9" id="mAbout" href="#">About</a><li/>' + '    <li><a tabindex="8" id="mCareer" href="#">Career</a><li/>' + '    <li><a tabindex="7" id="mTeam" href="#">Team</a><li/>' + '    <li><a tabindex="6" id="mContact" href="#">Contact</a><li/>' + '</ul>' + '<ul class="menu">' + '    <li><a data-keynav-key="g" id="mTestKeyData" href="#">Test key data</a><li/>' + '    <li><a tabindex="5" id="mSettings" href="#">Settings</a><li/>' + '    <li><a tabindex="4" id="mProfile" href="#">Profile</a><li/>' + '    <li><a tabindex="3" id="mProjects" href="#">Projects</a><li/>' + '    <li><a tabindex="2" id="mHelp" href="#">Help</a><li/>' + '    <li><a tabindex="1" id="mSignOut" href="#">Sign out</a><li/>' + '</ul>' + '<div id="content">' + '    <a id="cSomething" href="#">Something</a>' + '    <label for="testInput">Testinput</label>' + '    <input id="testInput" type="text" value="" />' + '</div>';
  ks.getInstance().init();
  Scope.mockClear();
  mockTargetElement.mockClear();
  targetReturnElement.focus.mockClear();
});
test('keynav: new Keynav is instance of Keynav', function () {
  expect(ks.getInstance()).toBeInstanceOf(Keynav);
});
test('keynav: single Keynav instance', function () {
  expect(ks.getInstance()).toEqual(ks.getInstance());
});
test('keynav: scope', function () {
  var keynav = ks.getInstance();
  var mockScope = new Scope();
  keynav.addScope(mockScope);
  expect(keynav.getScope(mockScope.toString())).toBe(mockScope);
  expect(keynav.getScope('x')).toBe(null);
  keynav.removeScope(mockScope.toString());
  expect(keynav.getScope(mockScope.toString())).toBe(null);
});
each([['t'], ['c']]).test('keynav: focus next element on keyUp super-key and keyUp target-key', function (targetKey) {
  document.getElementById('content').focus();
  var keynav = ks.getInstance();
  var scope = new Scope();
  keynav.addScope(scope);
  document.activeElement.dispatchEvent(new KeyboardEvent('keyup', {
    'key': scope.toString(),
    bubbles: true
  }));
  document.activeElement.dispatchEvent(new KeyboardEvent('keyup', {
    'key': targetKey,
    bubbles: true
  }));
  expect(scope.getTargetElement).toHaveReturnedWith(targetReturnElement);
  expect(scope.getTargetElement).toHaveBeenCalledTimes(1);
  expect(scope.getTargetElement).toHaveBeenCalledWith(targetKey, document.activeElement);
  expect(targetReturnElement.focus).toHaveBeenCalledTimes(1);
});