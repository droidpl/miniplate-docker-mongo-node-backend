/*jslint node: true */
'use strict';

// Support for import/export library
require('import-export');

const bluebird = require('bluebird');
const server = require('./server/scafold/serverFactory');

global.Promise = bluebird;

server.start();