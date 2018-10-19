/*jslint node: true */
'use strict';

import ErrorFactory from '../utils/errorFactory';
import {SAMPLE_CONSTANT} from '../constants';

class SampleBusiness {
    async getSampleData(data) { // jshint ignore:line
        return Promise.resolve({constant: SAMPLE_CONSTANT})
    }

    async getError(data) {
        return Promise.reject(ErrorFactory.internal("This is a 500 error"))
    }
}

export default new SampleBusiness()