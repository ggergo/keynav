const ScopeInterface = require('./scopeInterface');
const { v4: uuidv4 } = require('uuid');

module.exports = class Keynav {
    #scopes = [];
    #scopeState = null;
    #notReceivingSelectors = [];
    listeningTimeMS = 2000;

    constructor() {
        this.init();
    }

    init() {
        this.#scopes = [];
        this.#scopeState = null;
        this.#notReceivingSelectors = [
            'input[type="text"]',
            'input[type="date"]',
            'input[type="datetime-local"]',
            'input[type="email"]',
            'input[type="month"]',
            'input[type="number"]',
            'input[type="password"]',
            'input[type="search"]',
            'input[type="tel"]',
            'input[type="time"]',
            'input[type="url"]',
            'input[type="week"]',
            'textarea',
            '[contenteditable="true"]'
        ];
        this.listeningTimeMS = 2000;
        this.removeEventListener();
        this.addEventListener();
    }

    clearNotReceivingSelectors() {
        this.#notReceivingSelectors = [];
    }

    addNotReceivingSelector(selector) {
        if (-1 === this.#notReceivingSelectors.indexOf(selector)) {
            this.#notReceivingSelectors.push(selector);
        }
    }

    removeNotReceivingSelector(selector) {
        let index = this.#notReceivingSelectors.indexOf(selector);
        if (-1 !== index) {
            this.#notReceivingSelectors.splice(index, 1);
        }
    }

    get listeningTimeMS() {
        return this.listeningTimeMS;
    }

    set listeningTimeMS(listeningTimeMS) {
        this.listeningTimeMS = listeningTimeMS;
    }

    addEventListener() {
        document.addEventListener("keyup", this.#fnListener);
    }

    removeEventListener() {
        document.removeEventListener("keyup", this.#fnListener);
    }

    addScope(newScope) {
        if (!(newScope instanceof ScopeInterface)) {
            return false;
        }

        for (const scope of this.#scopes) {
            if (scope.toString() === newScope.toString()) {
                console.log('scope already exists');
                return false;
            }
        }

        this.#scopes.push(newScope);
    }

    removeScope(scopeString) {
        for (const index in this.#scopes) {
            if (scopeString === this.#scopes[index].toString()) {
                this.#scopes.splice(index, 1);
                break;
            }
        }
    }

    getScope(scopeString) {
        for (const scope of this.#scopes) {
            if (scopeString === scope.toString()) {
                return scope;
            }
        }

        return null;
    }

    #fnListener = (event) => {
        if (this.#isExpectingSuperKey()) {
            if (this.#isSuperKeyPressValid(event.key)) {
                var tmpScopeState = { 'superKey': event.key, 'r': uuidv4() };
                this.#scopeState = tmpScopeState;

                setTimeout(() => {
                    if (this.#scopeState === tmpScopeState) {
                        this.#scopeState = null;
                    }
                }, this.listeningTimeMS);
            }
        } else {
            let scope = this.getScope(this.#scopeState.superKey);
            this.#scopeState = null;
            if (scope) {
                let targetElement = scope.getTargetElement(event.key, document.activeElement);
                if (targetElement) {
                    targetElement.focus();
                }
            }
        }
    };

    #isExpectingSuperKey() {
        return null === this.#scopeState;
    }

    #isSuperKeyPressValid(key) {
        return  !(document.activeElement.matches(this.#notReceivingSelectors.join(','))) &&
                0 < this.#scopes.filter((obj) => obj.toString() === key).length;
    }
}