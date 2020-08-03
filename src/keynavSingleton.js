const Keynav = require('./keynav');

class KeynavSingleton {
    constructor() {
        this.keynav = new Keynav();
    }

    getInstance() {
        return this.keynav;
    }
}

const keynavSingleton = new KeynavSingleton();
Object.freeze(keynavSingleton);
module.exports = keynavSingleton;