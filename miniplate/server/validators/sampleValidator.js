/*jslint node: true */
'use strict';

import Validator from '../utils/validator';
import Validation from '../utils/validation';

class SampleValidator {
    static validateSample(data) {
        const validator = Validator.create();

        validator.runValidation(
            new Validation(
                'name',
                Validator.getValueOrNull(data, 'name'),
                'invalid or missing name param'
            ).validateString()
        );

        return validator;
    }
}

export default SampleValidator