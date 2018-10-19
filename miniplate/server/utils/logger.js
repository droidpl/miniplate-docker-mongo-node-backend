'use strict';

import winston from 'winston'
import environment from '../configs/environment'

function expandErrors(logger) {
    var oldLogFunc = logger.log;
    logger.log = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.length >= 2 && args[1] instanceof Error) {
            args[1] = args[1].stack;
        }
        return oldLogFunc.apply(this, args);
    };
    return logger;
}

function ignoreEpipe(err) {
    return err.code !== 'EPIPE';
}

var transports = [
    new (winston.transports.Console)({
        level: environment.server.LOG_LEVEL ? 'debug' : 'info',
        showLevel: true,
        colorize: true,
        stderrLevels: ['error'],
        timestamp: true,
        humanReadableUnhandledException: true,
        prettyPrint: true
    })
]


var logger = expandErrors(new winston.Logger({
    transports: transports
}));

var debug = logger.debug;
logger.debug = function () {
    arguments[0] = '[' + new Date().toISOString() + '] ' + (arguments[0] || '');
    debug.apply(null, arguments);
};

logger.exitOnError = ignoreEpipe;

export default logger
