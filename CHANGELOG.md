# [0.3.0](https://github.com/Dan6erbond/jolt/compare/v0.2.1...v0.3.0) (2023-04-15)


### Features

* testing ci ([be529d4](https://github.com/Dan6erbond/jolt/commit/be529d4130f122baf208b908a607606e7a599759))



## [0.2.1](https://github.com/Dan6erbond/jolt/compare/v0.2.0...v0.2.1) (2023-04-15)


### Bug Fixes

* :bug: fix append for slices creaetd with `make()` and length ([eff801b](https://github.com/Dan6erbond/jolt/commit/eff801bb63c970152ead9a58d500457e33e64666))
* :bug: fix tmdb season route ([b52b9d1](https://github.com/Dan6erbond/jolt/commit/b52b9d1fd01c9bae9c2a5bdb443975314ebdd282))
* :bug: gracefully handle errors with logger ([da67bfb](https://github.com/Dan6erbond/jolt/commit/da67bfb0e5cf60ebeedfa5d3329f5ddc509c7806))
* :bug: remove usage of FixOrCreate() due to unique constraints ([a26e505](https://github.com/Dan6erbond/jolt/commit/a26e50592ac094fde3c6a9b63eed98b28591d9b8))
* :bug: save tv ([aae5613](https://github.com/Dan6erbond/jolt/commit/aae56130e4a88340e03032ecbf99c85e34bba7bf))
* :bug: update calls to tv mutations on tv details page ([0b84ff3](https://github.com/Dan6erbond/jolt/commit/0b84ff35850892f8834dfbe4ecbb1597fa0f26ea))
* :bug: use append to avoid nil entries in watched ([b08d87b](https://github.com/Dan6erbond/jolt/commit/b08d87bec577e744bb78d0fe576dc5f56fec0712))
* :lipstick: fix tab styling ([0e7fd9b](https://github.com/Dan6erbond/jolt/commit/0e7fd9b8db8ab921f7cfe0f3861c7815cba5aa7b))
* :lock: fix refresh tokens being assigned to user id 1 ([9dc45cf](https://github.com/Dan6erbond/jolt/commit/9dc45cf868f5a2abd61dca96bf4a8ffa7450ea09))


### Features

* :goal_net: fix refresh token error handling ([817480b](https://github.com/Dan6erbond/jolt/commit/817480bd7ec4977edfef791c50bb4193c3bf8b02))
* :sparkles: add Cobra CLI and server command to run server ([f9f4f2f](https://github.com/Dan6erbond/jolt/commit/f9f4f2fc7a65d362c820a5c374fa9f7453a56f8e))
* :sparkles: add GetOrCreateMovieByID and GetOrCreateTvByID methods and update use of ByTmdbID with default sync param ([1fe46d3](https://github.com/Dan6erbond/jolt/commit/1fe46d3a12897b7445af3547dfe97a60c960870a))
* :sparkles: add JellyfinID and JellyfinServerID to movie model and jellyfinUrl to GQL schema ([d5a49fa](https://github.com/Dan6erbond/jolt/commit/d5a49faa181899ba69d295908a5d36add1846e65))
* :sparkles: add overview to movie and tv models and include in syncing ([d218534](https://github.com/Dan6erbond/jolt/commit/d218534f70a67e86b1220111a8cb3d0736e09a97))
* :sparkles: add profileImageUrl to user and return jellyfin profile image if available ([206a548](https://github.com/Dan6erbond/jolt/commit/206a5486a5d10a5ef2bfe521215f34b23380ead2))
* :sparkles: add responsive navbar and use mantine header component ([7427eb1](https://github.com/Dan6erbond/jolt/commit/7427eb10472e40405b5fe40394e6100339c325ec))
* :sparkles: add tv season and episodes to data model and syncing ([8fb1143](https://github.com/Dan6erbond/jolt/commit/8fb1143a38ba81c659f756cfc46bf6674ca43478))
* :sparkles: add user watched and comments tabs ([4cc2b35](https://github.com/Dan6erbond/jolt/commit/4cc2b352ad5cf96cfc40ea5048386dfe1f551c5a))
* :sparkles: add watched relations to movie and tv models ([cc17f54](https://github.com/Dan6erbond/jolt/commit/cc17f54ab08769eb60eef679a2e13ab4a00baa6a))
* :sparkles: handle errors and return url.URL in Jellyfin client ([3319401](https://github.com/Dan6erbond/jolt/commit/33194014220635f100a72893df3b1c6b25ef3cc1))
* :sparkles: implement following mechanics, user reviews resolver and jellyfinid ([dfddba9](https://github.com/Dan6erbond/jolt/commit/dfddba9898c73a8ee347c9d1ec25b09c25b72e6a))
* :sparkles: implement full tv syncing with seasons and episodes ([88c6da3](https://github.com/Dan6erbond/jolt/commit/88c6da35dd98d4226655c231e439207e68644422))
* :sparkles: implement Jellyfin seasons and episodes requests ([9567fb2](https://github.com/Dan6erbond/jolt/commit/9567fb261cc9e1b130c3674a24f9a3ca5b8672cc))
* :sparkles: implement jellyfin sync ([62f80e0](https://github.com/Dan6erbond/jolt/commit/62f80e01e301795b309f4992552b67b05ac658f2))
* :sparkles: implement JellyfinClient.DoAuthenticatedRequest() to simplify code ([66c8ff0](https://github.com/Dan6erbond/jolt/commit/66c8ff07677b0b144abaa699aad8564419858ad6))
* :sparkles: implement logout and fix user profile links ([cbde560](https://github.com/Dan6erbond/jolt/commit/cbde560b7e8b6c29ce2576c0bd9a979988077937))
* :sparkles: implement TMDB tv seasons endpoint ([fce92eb](https://github.com/Dan6erbond/jolt/commit/fce92eb8ef9c0085ebf95ec1884b7a471a04b44d))
* :sparkles: implement user profile page and user avatar component ([4cb4724](https://github.com/Dan6erbond/jolt/commit/4cb47247f31d0adf08ec7273badf3c1843b08569))
* :sparkles: implement watched page ([e7256d5](https://github.com/Dan6erbond/jolt/commit/e7256d5105aa7ba3aaabea97c765757c9026ca78))
* :sparkles: implement watchedon attributes for tv and movies based on creation of watched relation ([6e4f053](https://github.com/Dan6erbond/jolt/commit/6e4f0538e13d1260413a4b7eee526f20084fee68))
* :sparkles: make tmdbid unique index and implement IsMedia on season and episode ([32d2fd5](https://github.com/Dan6erbond/jolt/commit/32d2fd51c35f5bcc5c2c6499d1b4378612ee01a2))
* :sparkles: move profile menu to sidebar on mobile and hide navbar on route change ([e83898e](https://github.com/Dan6erbond/jolt/commit/e83898e417ea1cb1e35539921a71fda814611cf2))
* :sparkles: refactor JellyfinUserID to JellyfinID and add JellyfinAccessTokenIsValid attributes to user ([5a39578](https://github.com/Dan6erbond/jolt/commit/5a395788d4e117ddf8382f90baddf1943d62cddd))
* :sparkles: refactor media card and fetch additional media attributes ([53ee0e6](https://github.com/Dan6erbond/jolt/commit/53ee0e628a9e50a3c5434f545dce210f6987cdc1))
* :sparkles: remove unnecesary data from RateMovie mutation for performance ([60c8e3b](https://github.com/Dan6erbond/jolt/commit/60c8e3bfe1a9e2b54bcff91b6a437754f95a1cec))
* :sparkles: set jellyfin access token valid flag on login ([bf9dd52](https://github.com/Dan6erbond/jolt/commit/bf9dd520d30a0c65595b3b25e2347c872430ea63))
* :sparkles: update search query to provide pagination for tmdb and use custom search result object to keep track of query ([adfcab7](https://github.com/Dan6erbond/jolt/commit/adfcab72ed237d4204dc9350565bc2335ff3eee9))
* :sparkles: use development logger if not in production ([f6c688f](https://github.com/Dan6erbond/jolt/commit/f6c688fe788f54539a57491f1fcb21baa38d4556))
* :sparkles: use firstorinit to avoid unnecessary db calls ([bf5a0a4](https://github.com/Dan6erbond/jolt/commit/bf5a0a4dd5bc46fb9c541ef132a76038201ddc42))
* :sparkles: use preload to get refresh token user ([2552b01](https://github.com/Dan6erbond/jolt/commit/2552b015aa4b20792ed7e1adadeafe575281097e))
* :sparkles: use references and remove unneeded temporary variables ([721924e](https://github.com/Dan6erbond/jolt/commit/721924ec1d8bfb328ed374ebc4753a04455d7458))
* :sparkles: use UserAvatar component and include jellyfinId in queries ([ed4cfc9](https://github.com/Dan6erbond/jolt/commit/ed4cfc9484da191490ba5625eb5a6af01bce6b6f))


### Performance Improvements

* :zap: improve movie discovery performance with goroutines to fetch movie data ([57e7dbc](https://github.com/Dan6erbond/jolt/commit/57e7dbcc1921bfa3665c115f8d4b7da88ab9f158))
* :zap: improve search performance with goroutines for fetching media data ([e30b690](https://github.com/Dan6erbond/jolt/commit/e30b690b4244b7de8e685f4db8dc071974adf2c0))
* :zap: use reference instead of new value ([c72bc0d](https://github.com/Dan6erbond/jolt/commit/c72bc0dd45811a2f1dbbfa764694f45c28e5bb7c))



# [0.1.0](https://github.com/Dan6erbond/jolt/compare/v0.1.0-prerelease...v0.1.0) (2023-04-08)


### Bug Fixes

* :bug: fix updated props for modal overlay ([0b05c35](https://github.com/Dan6erbond/jolt/commit/0b05c35679f4440ba14700ac4554437b539d1be4))


### Features

* :sparkles: add argument for sync with tmdb ([a8edc68](https://github.com/Dan6erbond/jolt/commit/a8edc685baff297ded050ffa8adfd2568bb6f8c0))
* :sparkles: implement frontend watched functionality ([593e712](https://github.com/Dan6erbond/jolt/commit/593e7124d65e5d32f1a2ae50b82258703ed6496e))
* :sparkles: implement movie suggestions using tmdb recommend movies with scoring algorithm ([0094e7d](https://github.com/Dan6erbond/jolt/commit/0094e7de5839f125b7fb5d40499f0b173844ecbb))
* :sparkles: implement movie watched functionality ([8f4c094](https://github.com/Dan6erbond/jolt/commit/8f4c094bc1d8d852b6ae6d67003c6bd232d06070))
* :sparkles: implement tv watched functionality ([a6104c9](https://github.com/Dan6erbond/jolt/commit/a6104c9cb4b9beaa6e8cf99d4c444ee0c2a522eb))
* :sparkles: load movie suggestions on discovery page and display in carousel ([2985438](https://github.com/Dan6erbond/jolt/commit/29854387d0902dd16ee47e2587da4823d0332c5a))
* :sparkles: refactor reviews and ratings to `ReviewService` and fix other linter errors ([8a28fac](https://github.com/Dan6erbond/jolt/commit/8a28fac2738606786c98bb097924195e47887f66))
* :sparkles: show no results found for profiles ([bfb68d0](https://github.com/Dan6erbond/jolt/commit/bfb68d02e665b07482981fe8096bbee12c00c676))
* :zap: improve performance by using count instead of fetching all watched values ([526b00f](https://github.com/Dan6erbond/jolt/commit/526b00f2a9659413b4c027cdeb99ff234f3293df))



# [0.1.0-prerelease](https://github.com/Dan6erbond/jolt/compare/0da97fd0fa0d105930fb63a3f6580e4d10f694f2...v0.1.0-prerelease) (2023-04-08)


### Bug Fixes

* :bug: fix user id assignment to reviews ([412eee5](https://github.com/Dan6erbond/jolt/commit/412eee5d36b5ab8f08c9b1d2284b0c3aaedc075f))
* :rotating_light: fix ts issues temporarily in search ([676674f](https://github.com/Dan6erbond/jolt/commit/676674f785ff7e5aeabc0137e56bb74758018b4d))


### Features

* :fire: remove default app styles ([b9b88a1](https://github.com/Dan6erbond/jolt/commit/b9b88a1acfae2e292bb8cf06536350a9743da018))
* :fire: remove default app styles ([578ed87](https://github.com/Dan6erbond/jolt/commit/578ed874594a58b9c018b50cfb34b82f70e1fa01))
* :sparkles: add autocomplete hints in login ([0a9f3b6](https://github.com/Dan6erbond/jolt/commit/0a9f3b69a137dcc62372e9c67abfba7a62236135))
* :sparkles: add graphql types to recommendation card ([dc5d24a](https://github.com/Dan6erbond/jolt/commit/dc5d24a47652e5cac248a9ef6d28b74fa3c592ce))
* :sparkles: add missing keys ([be9d912](https://github.com/Dan6erbond/jolt/commit/be9d9124074ba13b8a3ab6b97117053402eb9c26))
* :sparkles: add spa handler for production with configuration via environment variables ([1dc4fed](https://github.com/Dan6erbond/jolt/commit/1dc4fed973cf057487f9ce7db08fdf59762e8863))
* :sparkles: add tmdbid to gql request ([4262148](https://github.com/Dan6erbond/jolt/commit/4262148dd34623bff46867c3cbc0f81ed81be722))
* :sparkles: add tv details page ([391a3fb](https://github.com/Dan6erbond/jolt/commit/391a3fb31996600e49ce8c5b3c16522fce3ee10d))
* :sparkles: fetch all media data from graphql and remove tmdb requests ([a2285c2](https://github.com/Dan6erbond/jolt/commit/a2285c24c159fd3654ec0355b9d71ad0b2731a95))
* :sparkles: implement `useSearch` hook and replace tmdb search ([6df7998](https://github.com/Dan6erbond/jolt/commit/6df79984659dae1f9886d6774078837d787963b4))
* :sparkles: implement discover via GQL, recommendations, reviews and ratings ([a29cde1](https://github.com/Dan6erbond/jolt/commit/a29cde12242e07ab44cb5916e9180431e733064f))
* :sparkles: implement prototype of feed, discover, movie details, recommendations and mash-up screens ([6905cc0](https://github.com/Dan6erbond/jolt/commit/6905cc08cc90b84079e4bf38bfe64e043832d957))
* :sparkles: implement prototype of feed, discover, movie details, recommendations and mash-up screens ([fa9c0c1](https://github.com/Dan6erbond/jolt/commit/fa9c0c1ca0d45aabf58ad87cde73a78bab12d1ab))
* :sparkles: implement recommendations, movie discovery queries and mutations ([fc8a23d](https://github.com/Dan6erbond/jolt/commit/fc8a23d16cc7307115918b46e1fb6750808d22e8))
* :sparkles: implement search query with pagination ([a694fa3](https://github.com/Dan6erbond/jolt/commit/a694fa3ede6ec1d9423afc0528ac82deb182ae80))
* :sparkles: implement Tv model and syncing functionality ([2cad668](https://github.com/Dan6erbond/jolt/commit/2cad66877f7db96fd254270408ef44f5fb5ca3c3))
* :sparkles: implement tv resolver ([8bd4bb1](https://github.com/Dan6erbond/jolt/commit/8bd4bb1c9b0b3e486dcaa262eec502893ceda95e))
* :sparkles: implement user auth, movie ratings, reviews and recommendations ([7f2e70c](https://github.com/Dan6erbond/jolt/commit/7f2e70cc0f7730cd3f08714f3953f910719c02f8))
* :sparkles: implement user auth, movie ratings, reviews and recommendations ([aaa7b1e](https://github.com/Dan6erbond/jolt/commit/aaa7b1eacab98ef4b53df170747919fb5d5bcec4))
* :sparkles: implement users query ([324fd61](https://github.com/Dan6erbond/jolt/commit/324fd61006a578d8e1804ba9ae4f3a4f17abd364))
* :sparkles: include profile results in search ([7db971c](https://github.com/Dan6erbond/jolt/commit/7db971cce31d5a4615721d924f2fc485d1a24bce))
* :sparkles: increase access token validity time to 24h in dev mode ([92f0ce4](https://github.com/Dan6erbond/jolt/commit/92f0ce44e42aea3f685be4a4e9c2ae1c0b4887f6))
* :sparkles: load feed and display cards, remove usage of legacy views ([1e0170b](https://github.com/Dan6erbond/jolt/commit/1e0170b3c52f09081790bb5ae4ca1183dd3d792f))
* :sparkles: refactor `MovieReview` to `Review` and add GolangCI-Lint ([bae6935](https://github.com/Dan6erbond/jolt/commit/bae6935a047f0caa2958ddca86bf860b87bd5266))
* :sparkles: remove tmdb types from poster ([5dbd98f](https://github.com/Dan6erbond/jolt/commit/5dbd98f4be35d5e84324f04789d12010e1d9ea5f))
* :sparkles: remove TMDB types from Poster ([81c923b](https://github.com/Dan6erbond/jolt/commit/81c923bb5b123f21f75c453a065c687c7ac36821))
* :sparkles: return JSON on authorization failure ([d5e3851](https://github.com/Dan6erbond/jolt/commit/d5e3851334bdc30d53e10c24f6f49ee430ee8a48))
* :sparkles: set JellyfinUserID on login ([939bf0c](https://github.com/Dan6erbond/jolt/commit/939bf0c2e5bcb591e7b282f040af60be9c5f4160))
* :sparkles: update graphql path to /graphql in prod ([3f4e470](https://github.com/Dan6erbond/jolt/commit/3f4e47052b2e4a25eaefddc45f8fbfe84bf32fd9))
* :sparkles: use backend for queries ([04d7aa6](https://github.com/Dan6erbond/jolt/commit/04d7aa628bd323ec260133d5a4d1ce60dbb7e90c))
* :sparkles: use gql for watchlist ([2abefef](https://github.com/Dan6erbond/jolt/commit/2abefef2f1657f338604ad2baa73d2adbe49f517))
* :sparkles: use recommendation data in recommendation card ([19d920f](https://github.com/Dan6erbond/jolt/commit/19d920f8fe976b434d1c8681b628e0575594d3df))
* :tada: initialize apps with Vite and React for frontend and Golang Uber FX template for server ([e43cd28](https://github.com/Dan6erbond/jolt/commit/e43cd28958609db0341de3168a126da57e189e78))
* :tada: initialize apps with Vite and React for frontend and Golang Uber FX template for server ([0da97fd](https://github.com/Dan6erbond/jolt/commit/0da97fd0fa0d105930fb63a3f6580e4d10f694f2))



