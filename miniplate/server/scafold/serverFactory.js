/*jslint node: true */
'use strict';

const Express = require('express');
import environment from '../configs/environment';
import dbConnectionFactory from '../configs/connectionFactory';
import ShutdownHandler from './shutdownHandler';
import Logger from '../utils/logger'

class server {
    constructor() {
        this._app = null;
        return this;
    }

    _database() {
        try {
            dbConnectionFactory.create(environment.database)
        } catch (e) {
            Logger.error('Failed to connect to mongodb', e.message);
            process.exit(1);
        }

        return this;
    }

    _routes() {
        try {
            const Router = require('./router');

            const app = Express();
            Router.route(app);
            ShutdownHandler.handleShutdown(app);

            this._app = app;
        } catch (e) {
            Logger.error(e);
            Logger.error('Failed to create server', e.message);
            process.exit(1);
        }

        return this;
    }

    start() {
        this._database()
        this._routes();

        try {
            this._app.listen(environment.server.PORT, () => {
                Logger.info(`Sample API listening on port ${environment.server.PORT}!`)
            });
        } catch (e) {
            Logger.error('Failed to start server', e.message);
            process.exit(1);
        }
    }
}

export default new server()