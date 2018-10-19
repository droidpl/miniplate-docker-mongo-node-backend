/*jslint node: true */
'use strict';

import callbackToPromise from 'promise-callback';
import logger from '../utils/logger';

export default {
    handleShutdown: (server) => {
        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger.info('SIGTERM signal received');

            // close server first
            callbackToPromise(server.close)
            // exit process
                .then(() => {
                    logger.info('Succesfull graceful shutdown');
                    process.exit(0)
                })
                .catch((err) => {
                    logger.error('Server close');
                    process.exit(-1);
                });
        })
    }
}