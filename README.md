# Jolt

<img src="assets/name.png" width="80%" style="display:block; margin: 30px auto;max-width: 550px;">

The social hub for your media server.

> **Note:** This project is still in very early alpha stages. A lot of features are only lightly tested, and may not even be implemented yet, but there's lots more to come!

## Introduction

Jolt brings the users of your media server together in one place. With profiles directly integrated into Jellyfin, movie and TV data from TMDB, and a powerful feed and recommendation system, Jolt connects your users by allowing them to review and rate media, recommend movies and TV shows to each other, as well as **[WIP]** suggest movies and shows that groups can watch together.

### Features

- Rate, review, recommend movies and TV shows
- Add and remove movies and TV shows to and from your watchlist
- Discover new media using TMDB's discovery API
- **[WIP]** Generate media suggestions
- **[WIP]** Comment on movies and episodes with timestamp support
- **[WIP]** Sync Jellyfin media library and watched status
- **[WIP]** Create clips from media on your media server (Jellyfin) with optional burnt-in subtitles for sharing

### Screenshots

<table>
  <tbody>
    <tr>
      <td>
        <img src="./assets/screenshots/feed.png">
      </td>
      <td>
        <img src="./assets/screenshots/discover.png">
      </td>
    </tr>
    <tr>
      <td>
        <img src="./assets/screenshots/search.png">
      </td>
      <td>
        <img src="./assets/screenshots/recommendations.png">
      </td>
    </tr>
    <tr>
      <td>
        <img src="./assets/screenshots/movie.png">
      </td>
      <td>
        <img src="./assets/screenshots/tv.png">
      </td>
    </tr>
    <tr>
      <td>
        <img src="./assets/screenshots/watchlist.png">
      </td>
      <td>
        <img src="./assets/screenshots/mashup.png">
      </td>
    </tr>
  </tbody>
</table>

## Architecture

Jolt uses the modern approach, by separating frontend and backend. The frontend is implemented in React, using Mantine for UI, and Apollo Client for state management and GraphQL requests. This powerful combination enables a slick frontend app that looks great on desktop and mobile devices.

The backend is implemented using Golang. It uses the uber/fx library for dependency injection, GORM, GQLGen and Viper for configuration.

## Deployment

Since Jolt is still in alpha, currently no images are available on Docker Hub. The Docker Compose however can be used to deploy the current version of Jolt, with examples for the configuration at [`sample-config.yaml`](./sample-config.yaml) which needs to be renamed to `config.yaml` and shared values in [`.env.sample`](./.env.sample).

The Dockerfile compiles the frontend using Vite, and includes the files in a single run container which means all you need is one container to get Jolt up and running (and Postgres).

## Thanks

- Mantine
- Apollo
- GORM
- uber/fx
- Viper
- TMDB

## Contributing

🚧 Work in Progress!

### Development

The React app uses Vite as a dev server and for builds. Run `yarn dev` to start the dev server which supports HMR 🔥 and uses the `vite-plugin-graphql-codegen` to generate GraphQL type definitions.

In order to generate GraphQL types, the backend server must be running at port 5001.

The backend uses dev containers to isolate the Go development environment and enable easy networking with Postgres without needing to reserve port 5432. VSCode should detect the dev container configuration files in the `server` directory once opened, and prompt you to build the dev container and open VSCode in it.

Run `go run main.go` to start the server whenever changes are made. The GraphQL resolvers can be regenerated using `go generate ./...`.

## License

This project is licensed under the terms of the MIT license.
