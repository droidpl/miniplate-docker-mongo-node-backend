/*jslint node: true */
'use strict';

import _ from 'lodash'
import ErrorFactory from './errorFactory'

/**
 * Validation class to pass to Validator
 */
class Validation {

    constructor(key, value, error) {
        this.errors = {}
        this.allowEmpty = false
        this.errorKey = key
        this.targetValue = value
        this.errorData = error
        if (!this.errorKey || !_.isString(this.errorKey) || _.isEmpty(this.errorKey)) {
            throw new Error('Validation needs a this.errorKey. Use setKey please')
        }
        if (!this.errorData || _.isEmpty(this.errorData)) {
            throw new Error('Validation needs the error data to report errors. Use setErrorData please')
        }
    }

    allowEmptyString(value) {
        this.allowEmpty = value || false
        return this
    }

    allowOptional(value) {
        this.isOptional = value || false
        return this
    }

    checkOptional() {
        return this.isOptional && (this.targetValue === null || this.targetValue === undefined)
    }

    addError() {
        if (_.isString(this.errorData)) {
            this.errors[this.errorKey] = {
                message: this.errorData
            }
        }
        else if (_.isObject(this.errorData)) {
            if (!this.errorData.hasOwnProperty('message')) {
                throw ErrorFactory.internal('this.errorData must have a property named message')
            }
            this.errors[this.errorKey] = this.errorData
        }
        else {
            throw ErrorFactory.internal('Invalid errorData in Validator')
        }
    }

    hasErrors() {
        return !_.isEmpty(this.errors)
    }


    /*
     * Validation starts here
     */

    validateObject() {
        if (this.checkOptional()) return this
        if (!this.targetValue || !_.isObject(this.targetValue) || _.isEmpty(this.targetValue) || _.isArray(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateArray() {
        if (this.checkOptional()) return this
        if (!this.targetValue || !_.isArray(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateNotEmptyArray() {
        if (this.checkOptional()) return this
        if (!this.targetValue || !_.isArray(this.targetValue) || _.isEmpty(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateInArray(validValuesArray) {
        if (this.checkOptional()) return this
        if (!this.targetValue || !_.includes(validValuesArray, this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateArrayMinLength(minLength) {
        if (this.checkOptional()) return this
        if (!this.targetValue || !_.isArray(this.targetValue) || this.targetValue.length < minLength) {
            this.addError()
        }
        return this
    }

    validateString() {
        if (this.checkOptional()) return this
        if (!this.allowEmpty && (!this.targetValue || _.isEmpty(this.targetValue))) {
            this.addError()
        }
        if (!_.isString(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateTimestamp() {
        return this.validateNumber()
    }

    validateNumber() {
        if (this.checkOptional()) return this
        if (!_.isNumber(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateFloat() {
        if (this.checkOptional()) return this
        this.validateNumber();

        const f = this.targetValue;
        if (f % 1 !== 0 && !(f === +f && f !== (f | 0))) {
            this.addError()
        }
        return this
    }

    validateRegex(regex) {
        if (this.checkOptional()) return this
        this.validateString()
        if (this.targetValue && !regex.test(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateUrl() {
        if (this.checkOptional()) return this
        this.validateRegex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/)
        return this;
    }

    validateNumberRange(range) {
        if (this.checkOptional()) return this
        this.validateNumber()
        if (this.targetValue < range[0] || this.targetValue > range[1]) {
            this.addError()
        }
        return this
    }

    validateNumeric() {
        if (this.checkOptional()) return this
        if (isNaN(parseFloat(this.targetValue)) || !isFinite(this.targetValue)) {
            this.addError()
        }
        return this
    }

    validateBoolean() {
        if (this.checkOptional()) return this
        if (this.targetValue !== false && this.targetValue !== true) {
            this.addError()
        }
        return this
    }
}

export default Validation