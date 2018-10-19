/*jslint node: true */
'use strict';

import ErrorFactory from './errorFactory';

module.exports = {
    InvalidGrantTypeError: ErrorFactory.badRequest('Invalid grant_type'),
    MissingFieldsError: ErrorFactory.badRequest('Missing fields'),
    AuthenticationRequiredError: ErrorFactory.forbidden('Authentication required'),
    AccessTokenExpiredError: ErrorFactory.unauthorized('Token expired'),
    RefreshTokenExpiredError: ErrorFactory.forbidden('Refresh token expired'),
    InvalidCredentialError: ErrorFactory.forbidden('Invalid credentials'),
    InvalidTokenError: ErrorFactory.forbidden('Invalid token'),
    InvalidRefreshTokenError: ErrorFactory.forbidden('Invalid token'),
    InternalServerError: (message) => {
        return ErrorFactory.internal(message);
    }
};