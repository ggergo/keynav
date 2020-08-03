const TitleHelper = require('./titleHelper');
const each = require('jest-each').default;

each([
    ['myInput1', 'myInputLabel1'],
    ['myInput2', 'myInputLabel2'],
    ['myInput3', 'myInputLabel3'],
    ['myInput4', null],
    ['myInput5', null],
]).test('TitleHelper getForElement', (elementId, forId) => {
    document.body.innerHTML =
        '<label id="myInputLabel1" for="myInput1">First input label</label>' +
        '<input id="myInput1" type="text" placeholder="One placeholder" />' +
        '<label id="myInputLabel2" for="myInput2">Second input label</label>' +
        '<input id="myInput2" type="text" placeholder="Two placeholder" />'+
        '<label id="myInputLabel3" for="myInput3"></label>' +
        '<input id="myInput3" type="text" placeholder="" />'+
        '<input id="myInput4" type="text" />';

    expect(TitleHelper.getForElement(document.getElementById(elementId))).toBe(document.getElementById(forId));
});

each([
    ['myInput1', 'o'],
    ['myInput2', 't'],
    ['myInput3', null],
    ['myInput4', null],
]).test('TitleHelper getAttributeFirstChar', (elementId, expected) => {
    document.body.innerHTML =
        '<label id="myInputLabel1" for="myInput1">First input label</label>' +
        '<input id="myInput1" type="text" placeholder="One placeholder" />' +
        '<label id="myInputLabel2" for="myInput2">Second input label</label>' +
        '<input id="myInput2" type="text" placeholder="Two placeholder" />'+
        '<label id="myInputLabel3" for="myInput3"></label>' +
        '<input id="myInput3" type="text" placeholder="" />'+
        '<input id="myInput4" type="text" />';

    expect(TitleHelper.getAttributeFirstChar(document.getElementById(elementId), 'placeholder')).toEqual(expected);
});

each([
    ['myInputLabel1', 'f'],
    ['myInputLabel2', 's'],
    ['myInputLabel3', null],
    ['myInputLabel4', null],
]).test('TitleHelper getTextContentFirstChar', (elementId, expected) => {
    document.body.innerHTML =
        '<label id="myInputLabel1" for="myInput1">First input label</label>' +
        '<input id="myInput1" type="text" placeholder="One placeholder" />' +
        '<label id="myInputLabel2" for="myInput2">Second input label</label>' +
        '<input id="myInput2" type="text" placeholder="Two placeholder" />'+
        '<label id="myInputLabel3" for="myInput3"></label>' +
        '<input id="myInput3" type="text" placeholder="" />'+
        '<input id="myInput4" type="text" />';

    expect(TitleHelper.getTextContentFirstChar(document.getElementById(elementId))).toEqual(expected);
});