const ks = require('./keynavSingleton');
const Scope = require('./scope');

module.exports = {
    'keynav' : ks.getInstance(),
    'Scope' : Scope
};