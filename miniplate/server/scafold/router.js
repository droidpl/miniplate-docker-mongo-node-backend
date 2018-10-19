/*jslint node: true */
'use strict';

import Express from 'express';
import bodyParser from 'body-parser';
import SampleController from '../controllers/sampleController';
import ErrorFactory from '../utils/errorFactory';

export default {
    route: (server) => {

        const router = Express.Router();
        router.use(bodyParser.json({strict: true, limit: '5mb'}));
        router.use(bodyParser.urlencoded({extended: false}));

        // trips
        router.get('/success', SampleController.getSuccess);
        router.get('/failure', SampleController.getError);

        // error handling
        router.use((err, req, res, next) => {
            // Handle body parser error
            if (err && err.status === 400 && err.type === 'entity.parse.failed') {
                return res.status(400).send(ErrorFactory.badRequest('malformed json'));
            }

            // Handle rest of errors
            return res.status(err.statusCode).send(err)
        });

        server.use('/api', router);

        // docs
        server.get('/', (req, res, next) => res.redirect(301, '/docs'));
        server.use('/docs', Express.static(__dirname + '/../docs'));
    }
}