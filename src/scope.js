const TitleHelper = require('./titleHelper');

module.exports = class Scope {
    #superKey;
    #superSelectors = [];
    #targetSelectors = [];

    fnGetTargetKey = (element) => {
        if (typeof element.dataset.keynavKey !== 'undefined') {
            return element.dataset.keynavKey;
        }

        let forEl = TitleHelper.getForElement(element);
        if (null !== forEl) {
            element = forEl;
        }

        let placeholder = TitleHelper.getAttributeFirstChar(element, 'placeholder');
        if (null !== placeholder) {
            return placeholder;
        }

        return TitleHelper.getTextContentFirstChar(element);
    };

    fnSortPossibleTargetElements = (a, b) => {
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
    };

    constructor(superKey, superSelectors) {
        this.#superKey = superKey;

        if (typeof superSelectors === 'string') {
            superSelectors = [superSelectors];
        }
        for (const ss of superSelectors) {
            this.addSuperSelector(ss);
        }

        const targetSelectors = [
            'input:not([tabindex="-1"]):not([disabled])',
            'select:not([tabindex="-1"]):not([disabled])',
            'textarea:not([tabindex="-1"]):not([disabled])',
            'a:not([tabindex="-1"])[href]',
            'button:not([tabindex="-1"]):not([disabled])',
            'area:not([tabindex="-1"])[href]',
            '*:not([tabindex="-1"])[contenteditable="true"]',
            '*:not([tabindex="-1"])[tabindex]',
            '*:not([tabindex="-1"])[autofocus]'
        ];
        for (const ts of targetSelectors) {
            this.addTargetSelector(ts);
        }
    }

    getSuperKey() {
        return this.#superKey;
    }

    getSuperSelectors() {
        return this.#superSelectors;
    }

    getTargetSelectors() {
        return this.#targetSelectors;
    }

    addSuperSelector(selector) {
        if (-1 === this.#superSelectors.indexOf(selector)) {
            this.#superSelectors.push(selector);
        }
    }

    clearTargetSelectors() {
        this.#targetSelectors = [];
    }

    addTargetSelector(selector) {
        if (-1 === this.#targetSelectors.indexOf(selector)) {
            this.#targetSelectors.push(selector);
        }
    }

    removeSuperSelector(selector) {
        let index = this.#superSelectors.indexOf(selector);
        if (-1 !== index) {
            this.#superSelectors.splice(index, 1);
        }
    }

    removeTargetSelector(selector) {
        let index = this.#targetSelectors.indexOf(selector);
        if (-1 !== index) {
            this.#targetSelectors.splice(index, 1);
        }
    }

    toString() {
        return this.getSuperKey();
    }

    #getSuperElements() {
        return [...document.querySelectorAll(this.#superSelectors.join(','))];
    }

    #getPossibleTargetElements(onlyVisible) {
        let possibleTarget = [];
        for (const superElement of this.#getSuperElements()) {
            let queryEls = superElement.querySelectorAll(this.#targetSelectors.join(','));
            queryEls = [...queryEls];
            if (onlyVisible) {
                // only visibles since there is no native css selector
                queryEls = queryEls.filter(filEl => filEl.offsetParent !== null);
            }
            // merge
            possibleTarget = [...new Set([...possibleTarget, ...queryEls])];
        }

        return possibleTarget.sort(this.fnSortPossibleTargetElements);
    }

    getTargetElement(targetKey, currentElement, onlyVisible = true) {
        let isBeyondCurrent = false;
        let firstElement = null;
        for (const possibleTargetElement of this.#getPossibleTargetElements(onlyVisible)) {
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

        if (null !== firstElement) {
            return firstElement;
        }

        return null;
    }
}