# Minimal docker-mongo-node boilerplate

This boilerplate contains the minimal configuration I usually use fro the backend projects
based on mongodb.

This configuration is as follow:

- Docker: contains docker-compose and docker images for the migrations, database and application
- Mongo: it contains an image for mongodb with 0 setup time
- Node: contains a fully divided Node app with an example of 1 web service
- Documentation: contains a swagger folder with the documentation
- File bootstrap: contains the scheleton of any app with the most default libraries, such as mongoose and lodash
- Contains a custom validator to help you validate your input

This boilerplate has been used in multiple projects and allow flexibility to get started
without removing a huge amount of code.

## How to run it

The application can be run either using docker or directly with npm and docker. I will divide this in two
sections, one for development and one for release to a server.

### Development

To run in development its better to just run locally the database and connect
against it using intellij or any other editor at your choice but without building the
container as it would be more tedious.

To run the database do:

```$xslt
docker-compose build
docker-compose up -d mongodb migrations
```

Then with this running you can execute your app using:
```$xslt
cd miniplate
npm install
npm run start:dev (or start:prod if you don't want hot reloading)
```

Or connect directly with your preferred ide and debugger. You can check if it worked running:
```
http://localhost:3001/api/success
or
http://localhost:3001/api/failure
```

### Release

Releasing it to a server is as easy as running the docker images generated. You can do it with
docker compose or kubernetes or any other container management tool at your decision.

Use the following command:

```$xslt
docker-compose build
docker-compose up -d api
```

This will automatically bring the migrations, mongodb and application in the proper
order to life.

The default port is ``3001`` and the url is http://localhost:3001.

### Adding a new environment with migrations

If you want to add a new environment the files that you need to change are:

- ``db-migrations/package.json``: add a new migrations run command with the file created before
- ``docker-compose.environment.yml``: point to the new environment to do the migrations properly
- ``db-migrations/configs/environment-migrations.json``: create your own environment for the migrations

To run this with docker you can do:

```$xslt
docker-compose build
docker-compose -f docker-compose.yml -f docker-compose.environment.yml up -d api
```

## Customizing for your project

The boilerplate is setup in a way that you can just replace the word ```miniplate``` for 
the name of your project and all should still work with all the variables setup for you actual
naming.

## Documentation

The project also contains documentation for the API. For that you can just enter ``localhost:3001/docs`` and it will display
the theme for the documentation. Edit tje file ``miniplate/docs/api.json`` to create the proper swagger documentation