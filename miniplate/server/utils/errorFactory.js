/*jslint node: true */
'use strict';

import createError from 'http-errors'

class ErrorFactory {
    static internal(message) {
        return ErrorFactory._transformError(createError(500, message || 'Internal server error'))
    }

    static badRequest(message) {
        return ErrorFactory._transformError(createError(400, message || 'Bad request'))
    }

    static unauthorized(message) {
        return ErrorFactory._transformError(createError(401, message || 'Unauthorized'))
    }

    static forbidden(message) {
        return ErrorFactory._transformError(createError(403, message || 'Forbidden'))
    }

    static notFound(message) {
        return ErrorFactory._transformError(createError(404, message || 'Not found'))
    }

    static conflict(message) {
        return ErrorFactory._transformError(createError(409, message || 'Conflict'))
    }

    static _transformError(error) {
        error.error = error.error || {}
        error.error.message = error.message
        delete error.message
        return error
    }

}

export default ErrorFactory