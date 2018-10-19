/*jslint node: true */
'use strict';

import _ from 'lodash'
import ErrorFactory from './errorFactory'
import Validation from './validation'
import Logger from './logger'
import mongoose from 'mongoose'

/**
 * Validator class to validate all our requests' data
 */
class Validator {

    constructor() {
        this.errors = {}
    }

    static create() {
        return new Validator()
    }

    reset() {
        this.errors = {}
    }

    /**
     * Import errors from Validation child class if any
     *
     * @param validation
     */
    runValidation(validation) {
        if (!validation || !(validation instanceof Validation)) {
            throw Error('You can only add Validation objects here')
        }
        if (validation.hasErrors()) {
            // import errors
            this.errors = Object.assign({}, this.errors, validation.errors)
        }
        return this
    }

    hasErrors() {
        return !_.isEmpty(this.errors)
    }

    /**
     * Checks if there are any errors an throws an exception
     */
    throwErrors() {
        if (this.hasErrors()) {
            Logger.debug(`[Validator] Validator error: ${JSON.stringify(this.errors)}`)
            throw ErrorFactory.badRequest(this.errors)
        }
        return this
    }

    /**
     * We need this in case the property is missing in the POST data object
     * to avoid braking the validation by trying to access a non-existent property
     *
     * @param object
     * @param property
     * @returns this.targetValue|{null}
     */
    static getValueOrNull(object, property) {
        if (!object || !_.isObject(object) || _.isEmpty(object)) {
            return null
        }
        if (
            object.constructor.name === 'model' &&
            (
                (object._id && mongoose.Types.ObjectId.isValid(object._id)) ||
                (object.id && mongoose.Types.ObjectId.isValid(object.id))
            )
        ) {
            // object is mongoose object
            object = object.toObject()
        }
        // property exists
        if (object.hasOwnProperty(property)) {
            // trim spaces in strings
            if (typeof object[property] === 'string') {
                object[property] = object[property].trim()
            }
            return object[property]
        }
        return null
    }

}

export default Validator