module.exports = class TitleHelper {
    static getForElement(element) {
        if (null !== element) {
            let id = element.id;
            if (id.length > 0){
                let forElement = document.querySelector('label[for="'+id+'"');
                if (forElement !== null) {
                    return forElement;
                }
            }
        }

        return null;
    }

    static getAttributeFirstChar(element, attribute) {
        return  null !== element &&
                element.getAttribute(attribute) !== null &&
                element.getAttribute(attribute) !== "" &&
                element.getAttribute(attribute).trim().length > 0 &&
                typeof element.getAttribute(attribute).trim()[0] !== 'undefined' ?
                element.getAttribute(attribute).trim()[0].toLowerCase() :
                null;
    }

    static getTextContentFirstChar(element) {
        return  null !== element &&
                typeof element.textContent !== 'undefined' &&
                element.textContent.trim().length > 0 &&
                typeof element.textContent.trim()[0] !== 'undefined' ?
                element.textContent.trim()[0].toLowerCase() :
                null;
    }
}