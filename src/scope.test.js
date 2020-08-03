const Scope = require('./scope');
const ScopeInterface = require('./scopeInterface');
const each = require('jest-each').default;

beforeEach(() => {
    document.body.innerHTML =
        '<ul class="menu">' +
        '    <li><a tabindex="10" id="mHome" href="#">Home</a><li/>' +
        '    <li><a tabindex="9" id="mAbout" href="#">About</a><li/>' +
        '    <li><a tabindex="8" id="mCareer" href="#">Career</a><li/>' +
        '    <li><a tabindex="7" id="mTeam" href="#">Team</a><li/>' +
        '    <li><a tabindex="6" id="mContact" href="#">Contact</a><li/>' +
        '</ul>' +

        '<ul class="menu">' +
        '    <li><a data-keynav-key="g" id="mTestKeyData" href="#">Test key data</a><li/>' +
        '    <li><a tabindex="5" id="mSettings" href="#">Settings</a><li/>' +
        '    <li><a tabindex="4" id="mProfile" href="#">Profile</a><li/>' +
        '    <li><a tabindex="3" id="mProjects" href="#">Projects</a><li/>' +
        '    <li><a tabindex="2" id="mHelp" href="#">Help</a><li/>' +
        '    <li><a tabindex="1" id="mSignOut" href="#">Sign out</a><li/>' +
        '</ul>' +

        '<div id="content">' +
        '    <a id="cSomething" href="#">Something</a>' +
        '    <label for="testInput">Testinput</label>' +
        '    <input id="testInput" type="text" value="" />' +
        '</div>';
});

test('new scope', () => {
    let scope = new Scope('m', '.menu');
    expect(scope).toBeInstanceOf(Scope);
    expect(scope instanceof ScopeInterface).toBe(true);
});

each([
    ['m', '.menu', 'm'],
    ['c', '#content', 'c'],
]).test('scope getSuperKey', (superKey, superSelectors, expected) => {
    let scope = new Scope(superKey, superSelectors);
    expect(scope.getSuperKey()).toEqual(expected);
});

each([
    ['m', '.menu', '.myOtherSuper', '.myOtherSuper2', ['.menu', '.myOtherSuper2']],
    ['m', ['.menu'], '.myOtherSuper', '.myOtherSuper2', ['.menu', '.myOtherSuper2']],
]).test('scope superSelectors', (superKey, superSelectors, add1, add2, expected) => {
    let scope = new Scope(superKey, superSelectors);
    scope.addSuperSelector(add1);
    scope.addSuperSelector(add2);
    scope.removeSuperSelector(add1);
    expect(scope.getSuperSelectors()).toEqual(expected);
});

each([
    ['m', '.myTarget', '.myOtherTarget2', ['.myOtherTarget2']],
]).test('scope targetSelectors', (targetKey, add1, add2, expected) => {
    let scope = new Scope(targetKey, '.menu');
    scope.clearTargetSelectors();
    scope.addTargetSelector(add1);
    scope.addTargetSelector(add2);
    scope.removeTargetSelector(add1);
    expect(scope.getTargetSelectors()).toEqual(expected);
});

test('scope toString', () => {
    let scope = new Scope('m', '.menu');
    expect(scope.toString()).toEqual('m');
});

each([
    // no current element, find first element in scope
    ['m', '.menu', 't', '', 'mTeam'],
    // current element is in different scope
    ['m', '.menu', 't', 'cSomething', 'mTeam'],
    // current element is in same scope, find next which is earlier and has different targetKey
    ['m', '.menu', 't', 'mCareer', 'mTeam'],
    // current element is in same scope, find next which is beyond and has different targetKey
    ['m', '.menu', 't', 'mContact', 'mTeam'],
    // current element is in same scope, find next which is earlier and has same targetKey
    ['m', '.menu', 'c', 'mCareer', 'mContact'],
    // current element is in same scope, find next which is beyond and has same targetKey
    ['m', '.menu', 'c', 'mContact', 'mCareer'],
    // current element is in same scope, find next which is the focused element
    ['m', '.menu', 't', 'mTeam', 'mTeam'],
    // current element is in same scope, but in different container
    ['m', '.menu', 't', 'mProjects', 'mTeam'],
    // targetKey is not an existing key
    ['m', '.menu', 'q', 'mProjects', null],
    // targetKey is not valid
    ['m', '.menu', null, 'mProjects', null],
    // test dataset.keynavKey
    ['m', '.menu', 'g', '', 'mTestKeyData']
]).test('scope getTargetElement', (superKey, superSelector, targetKey, currentElementId, expectedElementId) => {
    let scope = new Scope(superKey, superSelector);
    let currentElement = document.getElementById(currentElementId);
    if (!expectedElementId) {
        let expected = expectedElementId;
        expect(scope.getTargetElement(targetKey, currentElement)).toEqual(expected);
    } else {
        let expected = document.getElementById(expectedElementId);
        expect(scope.getTargetElement(targetKey, currentElement, false).isSameNode(expected)).toEqual(true);
    }
});