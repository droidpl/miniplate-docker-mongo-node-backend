/*jslint node: true */
'use strict';

import mongoose from 'mongoose'
import bluebird from 'bluebird';

import Logger from '../utils/logger'

export default {
    create: function (config) {
        const db = mongoose.connection;

        const host = config.DATABASE_HOST;
        const dbname = config.DATABASE_NAME;
        const port = config.DATABASE_PORT;
        const username = config.DATABASE_USERNAME;
        const password = config.DATABASE_PASSWORD;
        const supportSSL = config.DATABASE_SSL;

        db.on('connecting', function () {
            Logger.info('connecting to MongoDB...')
        });
        db.on('error', function (error) {
            Logger.error(`Error in MongoDb connection: ${error}`)
        });
        db.on('connected', function () {
            Logger.info('MongoDB connected!')
        });
        db.once('open', function () {
            Logger.info('MongoDB connection opened!')
        });
        db.on('reconnected', function () {
            Logger.info('MongoDB reconnected!')
        });
        db.on('disconnected', function () {
            Logger.info('MongoDB disconnected!')
        });

        return mongoose.connect(
            `mongodb://${host}:${port}/${dbname}`,
            {
                useNewUrlParser: true,
                native_parser: true,
                user: username,
                pass: password,
                ssl: supportSSL,
                sslValidate: false,
                promiseLibrary: bluebird,
                autoReconnect: true, // reconnect on error
                reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                reconnectInterval: 500, // Reconnect every 500ms
                poolSize: 10, // Maintain up to 10 socket connections
                // If not connected, return errors immediately rather than waiting for reconnect
                bufferMaxEntries: 0,
                connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            }
        )
    }
}