/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n      query Me {\n        me {\n          id\n          name\n        }\n      }\n    ": types.MeDocument,
    "\n      query Discover {\n        discoverMovies {\n          id\n          tmdbId\n          title\n          posterPath\n          backdropPath\n        }\n      }\n    ": types.DiscoverDocument,
    "\n        mutation Login($input: SignInWithJellyfinInput!) {\n          signInWithJellyfin(input: $input) {\n            accessToken\n            refreshToken\n          }\n        }\n      ": types.LoginDocument,
    "\n      query MyId {\n        me {\n          id\n        }\n      }\n    ": types.MyIdDocument,
    "\n      query Movie($tmdbId: ID!) {\n        movie(tmdbId: $tmdbId) {\n          id\n          rating\n          reviews {\n            id\n            review\n            createdBy {\n              id\n              name\n            }\n          }\n          userReview {\n            id\n            rating\n            review\n          }\n        }\n      }\n    ": types.MovieDocument,
    "\n      query Users {\n        users {\n          id\n          name\n        }\n      }\n    ": types.UsersDocument,
    "\n      mutation ReviewMovie($tmdbId: ID!, $review: String!) {\n        reviewMovie(tmdbId: $tmdbId, review: $review) {\n          movie {\n            id\n            reviews {\n              review\n              createdBy {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    ": types.ReviewMovieDocument,
    "\n        mutation RecommendMovie($tmdbId: ID!, $userId: ID!, $message: String!) {\n          createRecommendation(\n            input: {\n              tmdbId: $tmdbId\n              mediaType: MOVIE\n              recommendationForUserId: $userId\n              message: $message\n            }\n          ) {\n            id\n          }\n        }\n      ": types.RecommendMovieDocument,
    "\n                            mutation RateMovie($tmdbId: ID!, $rating: Float!) {\n                              rateMovie(tmdbId: $tmdbId, rating: $rating) {\n                                movie {\n                                  id\n                                  rating\n                                  userReview {\n                                    id\n                                    rating\n                                    review\n                                  }\n                                }\n                              }\n                            }\n                          ": types.RateMovieDocument,
    "\n      query Recommendations {\n        me {\n          recommendations {\n            id\n            media {\n              __typename\n              ... on Movie {\n                id\n                tmdbId\n              }\n            }\n            recommendedBy {\n              id\n              name\n            }\n            message\n          }\n        }\n      }\n    ": types.RecommendationsDocument,
    "\n      query Watchlist {\n        me {\n          id\n          watchlist {\n            __typename\n            ... on Movie {\n              id\n              tmdbId\n            }\n          }\n        }\n      }\n    ": types.WatchlistDocument,
    "\n          mutation RefreshTokens($refreshToken: String!) {\n            refreshTokens(refreshToken: $refreshToken) {\n              accessToken\n              refreshToken\n            }\n          }\n        ": types.RefreshTokensDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Me {\n        me {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      query Me {\n        me {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Discover {\n        discoverMovies {\n          id\n          tmdbId\n          title\n          posterPath\n          backdropPath\n        }\n      }\n    "): (typeof documents)["\n      query Discover {\n        discoverMovies {\n          id\n          tmdbId\n          title\n          posterPath\n          backdropPath\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation Login($input: SignInWithJellyfinInput!) {\n          signInWithJellyfin(input: $input) {\n            accessToken\n            refreshToken\n          }\n        }\n      "): (typeof documents)["\n        mutation Login($input: SignInWithJellyfinInput!) {\n          signInWithJellyfin(input: $input) {\n            accessToken\n            refreshToken\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query MyId {\n        me {\n          id\n        }\n      }\n    "): (typeof documents)["\n      query MyId {\n        me {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Movie($tmdbId: ID!) {\n        movie(tmdbId: $tmdbId) {\n          id\n          rating\n          reviews {\n            id\n            review\n            createdBy {\n              id\n              name\n            }\n          }\n          userReview {\n            id\n            rating\n            review\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Movie($tmdbId: ID!) {\n        movie(tmdbId: $tmdbId) {\n          id\n          rating\n          reviews {\n            id\n            review\n            createdBy {\n              id\n              name\n            }\n          }\n          userReview {\n            id\n            rating\n            review\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Users {\n        users {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      query Users {\n        users {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ReviewMovie($tmdbId: ID!, $review: String!) {\n        reviewMovie(tmdbId: $tmdbId, review: $review) {\n          movie {\n            id\n            reviews {\n              review\n              createdBy {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation ReviewMovie($tmdbId: ID!, $review: String!) {\n        reviewMovie(tmdbId: $tmdbId, review: $review) {\n          movie {\n            id\n            reviews {\n              review\n              createdBy {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation RecommendMovie($tmdbId: ID!, $userId: ID!, $message: String!) {\n          createRecommendation(\n            input: {\n              tmdbId: $tmdbId\n              mediaType: MOVIE\n              recommendationForUserId: $userId\n              message: $message\n            }\n          ) {\n            id\n          }\n        }\n      "): (typeof documents)["\n        mutation RecommendMovie($tmdbId: ID!, $userId: ID!, $message: String!) {\n          createRecommendation(\n            input: {\n              tmdbId: $tmdbId\n              mediaType: MOVIE\n              recommendationForUserId: $userId\n              message: $message\n            }\n          ) {\n            id\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                            mutation RateMovie($tmdbId: ID!, $rating: Float!) {\n                              rateMovie(tmdbId: $tmdbId, rating: $rating) {\n                                movie {\n                                  id\n                                  rating\n                                  userReview {\n                                    id\n                                    rating\n                                    review\n                                  }\n                                }\n                              }\n                            }\n                          "): (typeof documents)["\n                            mutation RateMovie($tmdbId: ID!, $rating: Float!) {\n                              rateMovie(tmdbId: $tmdbId, rating: $rating) {\n                                movie {\n                                  id\n                                  rating\n                                  userReview {\n                                    id\n                                    rating\n                                    review\n                                  }\n                                }\n                              }\n                            }\n                          "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Recommendations {\n        me {\n          recommendations {\n            id\n            media {\n              __typename\n              ... on Movie {\n                id\n                tmdbId\n              }\n            }\n            recommendedBy {\n              id\n              name\n            }\n            message\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Recommendations {\n        me {\n          recommendations {\n            id\n            media {\n              __typename\n              ... on Movie {\n                id\n                tmdbId\n              }\n            }\n            recommendedBy {\n              id\n              name\n            }\n            message\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query Watchlist {\n        me {\n          id\n          watchlist {\n            __typename\n            ... on Movie {\n              id\n              tmdbId\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Watchlist {\n        me {\n          id\n          watchlist {\n            __typename\n            ... on Movie {\n              id\n              tmdbId\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation RefreshTokens($refreshToken: String!) {\n            refreshTokens(refreshToken: $refreshToken) {\n              accessToken\n              refreshToken\n            }\n          }\n        "): (typeof documents)["\n          mutation RefreshTokens($refreshToken: String!) {\n            refreshTokens(refreshToken: $refreshToken) {\n              accessToken\n              refreshToken\n            }\n          }\n        "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;