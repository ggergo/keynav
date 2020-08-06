"use strict";

var ks = require('./keynavSingleton');

var Scope = require('./scope');

module.exports = {
  'keynav': ks.getInstance(),
  'Scope': Scope
};