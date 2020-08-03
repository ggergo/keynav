module.exports = class ScopeInterface {
    static [Symbol.hasInstance](obj) {
        let hasMethod = function(obj, methodName) {
            return methodName in obj && typeof obj[methodName] === 'function';
        };

        if (hasMethod(obj, 'getSuperKey') &&
            hasMethod(obj, 'getSuperSelectors') &&
            hasMethod(obj, 'addSuperSelector') &&
            hasMethod(obj, 'removeSuperSelector') &&
            hasMethod(obj, 'getTargetSelectors') &&
            hasMethod(obj, 'addTargetSelector') &&
            hasMethod(obj, 'removeTargetSelector') &&
            hasMethod(obj, 'getTargetElement') &&
            hasMethod(obj, 'toString')
        ) {
            return true;
        }
    }

    constructor(superKey, superSelectors, targetSelectors = null) {}
    getSuperKey() {}
    toString() {} // returns getSuperkey()
    getSuperSelectors() {}
    getTargetSelectors() {}
    addSuperSelector(selector) {}
    removeSuperSelector(selector) {}
    addTargetSelector(selector) {}
    removeTargetSelector(selector) {}
    getTargetElement(targetKey, currentElement) {}
}