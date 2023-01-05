![Funding](https://img.shields.io/github/sponsors/dan6erbond?style=flat)
![License](https://img.shields.io/github/license/dan6erbond/go-gqlgen-fx-template?style=flat)
![Stars](https://img.shields.io/github/stars/dan6erbond/go-gqlgen-fx-template?style=flat)

# Go GraphQL Template with GQLGen and Uber FX

This is a template project for GraphQL APIs built with [GQLGen](https://gqlgen.com/), Uber FX, GORM and Gorilla Toolkit.

## What's Included

- Gorilla Toolkit for Mux Routing and Middleware
- GQLGen to generate GraphQL schemas and resolvers
- Uber FX for dependency injection
- GORM to manage database models and migrations
- Zap for structured logging

Additionally, the project includes developer configuration for Docker Compose to run a Postgres database, develop with Devcontainers, and deploy to a production-ready container using Docker and Docker Compose. Traefik is also configured as a HTTP/S proxy with automatic Let's Encrypt certificates.

## Usage

This project is meant as a template for developers to get started quickly with building GraphQL APIs. It is built on top of a stack that works well for most apps and it is up to developers how they want to structure their apps and which tools and libraries they may use. All the boilerplate required to setup an FX app, generate GraphQL resolvers, and map GraphQL types to DB models is included.

### GraphQL Schema & Resolvers

GraphQL resolvers are implemented in the [`/graph`](./graph/) folder, and can be split into separate files by defining additional `.graphqls` files for the schema. The base `Resolver` type can define dependencies, which need to be included in the `NewResolver` constructor function that will be provided by FX dependency injection.

New models can be mapped to GORM models by configuring them in the `gqlgen.yml` file.

To generate resolvers after modifying your schema in any of the `.graphqls` files, run `go generate ./...`.

### Configuration

The Go app requires some configuration values to connect to the DB, configure the server, and uses Viper to load a `config.yaml` file as well as map default environment variables. You can either use those (see [Deploying](#deploying)) or provide this file in your workspace:

```yml
db:
  host: db
  port: 5432
  user: <user>
  password: <password>
  database: <database>
server:
  host: 0.0.0.0
```

> You're free to add additional config to this file and load the values with Viper as is done in [`main.go`](./main.go).

## Deploying

The `docker-compose.yml` files contains the base configuration for Postgres with a volume mount to the `.postgres` path for persistency. To deploy the entire app you will need to merge the `docker-compose.prod.yml` with the main file, by running `docker-compose` with the `-f` flag:

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

This will include the Traefik deployment, and use a `.env` file to configure Postgres credentials, database as well as your Go app. Make sure to include it with the following content:

```env
# Let's Encrypt ACME Staging Server for Testing
# ACME_CASERVER=https://acme-staging-v02.api.letsencrypt.org/directory
ACME_CASERVER=https://acme-v02.api.letsencrypt.org/directory
ACME_EMAIL=<your-email>
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db>
```

## Contributing

This project is meant to be a lightweight template that is compatible with most Go-based GraphQL APIs and to get started quickly with Uber FX and Gorilla Toolkit. This is why no advanced features are planned to be added, though small contributions are welcome.

## License

This project is licensed under MIT, so users are free to use it as they wish in their own private or commercial apps.
