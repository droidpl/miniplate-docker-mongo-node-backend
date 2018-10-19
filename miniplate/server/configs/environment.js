const envs = {
    server: {
        DEBUG: process.env.LOG_LEVEL || 'debug',
        PORT: process.env.PORT || 3001,
    },

    database: {
        DATABASE_HOST: process.env.DATABASE_HOST || '127.0.0.1',
        DATABASE_PORT: process.env.DATABASE_PORT || '27017',
        DATABASE_NAME: process.env.DATABASE_NAME || 'miniplate',
        DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'app',
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'devApp',
        DATABASE_SSL: (process.env.DATABASE_SSL || 'false') === 'true',
    }
};

export default envs