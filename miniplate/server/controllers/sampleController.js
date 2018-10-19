/*jslint node: true */
'use strict';

import Utils from '../utils/utils';
import SampleBusiness from '../business/sampleBusiness';

class SampleController {
    static getSuccess(req, res, next) {
        Utils.promisify(req, res, next, (params) => {
            return SampleBusiness.getSampleData(params)
        })
    }

    static async getError(req, res, next) { // jshint ignore:line
        Utils.promisify(req, res, next, async (params) => {
            return SampleBusiness.getError(params)
        })
    }
}

export default SampleController