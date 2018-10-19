/*jslint node: true */
'use strict';

import Logger from './logger'
import ErrorFactory from './errorFactory'

class Utils {
    static promisify(params, res, next, fun) {
        new Promise((resolve, reject) => {
            resolve(fun(params))
        }).then((data) => {
            if (data !== undefined) {
                res.send(data) // GETS EXECUTED ON POST, RESULTING IN 200
            }
        }).catch((error) => {
            Logger.error(error)
            if (error.stack) {
                Logger.error(error.stack)
            }
            if (!error.statusCode) {
                error = ErrorFactory.internal(error.message)
            }
            next(error)
        })
    }
}

export default Utils