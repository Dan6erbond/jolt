/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type AddToWatchlistInput = {
  mediaType: MediaType;
  tmdbId: Scalars['ID'];
};

export type CreateRecommendationInput = {
  mediaType: MediaType;
  message: Scalars['String'];
  recommendationForUserId: Scalars['ID'];
  tmdbId: Scalars['ID'];
};

export type FeedItem = Recommendation;

export type Media = Movie | Tv;

export enum MediaType {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type Movie = {
  __typename?: 'Movie';
  addedToWatchlist: Scalars['Boolean'];
  availableOnJellyfin: Scalars['Boolean'];
  backdropPath: Scalars['String'];
  certification?: Maybe<Scalars['String']>;
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  posterPath: Scalars['String'];
  rating: Scalars['Float'];
  releaseDate: Scalars['Time'];
  reviews: Array<Review>;
  tagline: Scalars['String'];
  title: Scalars['String'];
  tmdbId: Scalars['ID'];
  userReview?: Maybe<Review>;
  watched: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToWatchlist: Media;
  createRecommendation: Recommendation;
  rateMovie: Review;
  rateTv: Review;
  refreshTokens: RefreshTokenResult;
  removeFromWatchlist: Media;
  reviewMovie: Review;
  reviewTv: Review;
  signInWithJellyfin: SignInResult;
  toggleWatched: Media;
};


export type MutationAddToWatchlistArgs = {
  input: AddToWatchlistInput;
};


export type MutationCreateRecommendationArgs = {
  input: CreateRecommendationInput;
};


export type MutationRateMovieArgs = {
  rating: Scalars['Float'];
  tmdbId: Scalars['ID'];
};


export type MutationRateTvArgs = {
  rating: Scalars['Float'];
  tmdbId: Scalars['ID'];
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRemoveFromWatchlistArgs = {
  input: AddToWatchlistInput;
};


export type MutationReviewMovieArgs = {
  review: Scalars['String'];
  tmdbId: Scalars['ID'];
};


export type MutationReviewTvArgs = {
  review: Scalars['String'];
  tmdbId: Scalars['ID'];
};


export type MutationSignInWithJellyfinArgs = {
  input: SignInWithJellyfinInput;
};


export type MutationToggleWatchedArgs = {
  input: ToggleWatchedInput;
};

export type Query = {
  __typename?: 'Query';
  discoverMovies: Array<Movie>;
  discoverTvs: Array<Tv>;
  me: User;
  movie?: Maybe<Movie>;
  movieSuggestions: Array<Movie>;
  search: SearchResult;
  tv?: Maybe<Tv>;
  userFeed: Array<FeedItem>;
  users: Array<User>;
};


export type QueryMovieArgs = {
  id?: InputMaybe<Scalars['ID']>;
  tmdbId?: InputMaybe<Scalars['ID']>;
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};


export type QueryTvArgs = {
  id?: InputMaybe<Scalars['ID']>;
  tmdbId?: InputMaybe<Scalars['ID']>;
};

export type Recommendation = {
  __typename?: 'Recommendation';
  id: Scalars['ID'];
  media: Media;
  message: Scalars['String'];
  recommendationFor: User;
  recommendedBy: User;
};

export type RefreshTokenResult = {
  __typename?: 'RefreshTokenResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  createdBy: User;
  id: Scalars['ID'];
  media: Media;
  rating: Scalars['Float'];
  review: Scalars['String'];
  upboltedByCurrentUser: Scalars['Boolean'];
  upbolts: Scalars['Int'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  profiles: Array<User>;
  tmdb: TmdbSearchResult;
};


export type SearchResultTmdbArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

export type SignInResult = {
  __typename?: 'SignInResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type SignInWithJellyfinInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TmdbSearchResult = {
  __typename?: 'TMDBSearchResult';
  page: Scalars['Int'];
  results: Array<Media>;
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type ToggleWatchedInput = {
  mediaType: MediaType;
  tmdbId: Scalars['ID'];
};

export type Tv = {
  __typename?: 'Tv';
  addedToWatchlist: Scalars['Boolean'];
  availableOnJellyfin: Scalars['Boolean'];
  backdropPath: Scalars['String'];
  firstAirDate: Scalars['Time'];
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  posterPath: Scalars['String'];
  rating: Scalars['Float'];
  reviews: Array<Review>;
  tagline: Scalars['String'];
  tmdbId: Scalars['ID'];
  userReview?: Maybe<Review>;
  watched: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  recommendations: Array<Recommendation>;
  recommendationsCreated: Array<Recommendation>;
  watchlist: Array<Media>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', profiles: Array<{ __typename?: 'User', id: string, name: string }>, tmdb: { __typename?: 'TMDBSearchResult', page: number, totalPages: number, totalResults: number, results: Array<{ __typename: 'Movie', id: string, tmdbId: string, title: string, posterPath: string } | { __typename: 'Tv', id: string, tmdbId: string, name: string, posterPath: string }> } } };

export type DiscoverQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscoverQuery = { __typename?: 'Query', discoverMovies: Array<{ __typename?: 'Movie', id: string, tmdbId: string, title: string, posterPath: string, backdropPath: string }>, discoverTvs: Array<{ __typename?: 'Tv', id: string, tmdbId: string, name: string, posterPath: string, backdropPath: string }>, movieSuggestions: Array<{ __typename?: 'Movie', id: string, tmdbId: string, title: string, tagline: string, posterPath: string, backdropPath: string }> };

export type UserFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFeedQuery = { __typename?: 'Query', userFeed: Array<{ __typename?: 'Recommendation', id: string, message: string, media: { __typename?: 'Movie', id: string, tmdbId: string, title: string, tagline: string, releaseDate: any, posterPath: string, genres: Array<string> } | { __typename?: 'Tv', id: string, tmdbId: string, name: string, tagline: string, firstAirDate: any, posterPath: string, genres: Array<string> }, recommendedBy: { __typename?: 'User', id: string, name: string } }> };

export type LoginMutationVariables = Exact<{
  input: SignInWithJellyfinInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signInWithJellyfin: { __typename?: 'SignInResult', accessToken: string, refreshToken: string } };

export type MyIdQueryVariables = Exact<{ [key: string]: never; }>;


export type MyIdQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string } };

export type MovieQueryVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type MovieQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', id: string, tmdbId: string, title: string, tagline: string, posterPath: string, backdropPath: string, certification?: string | null, genres: Array<string>, releaseDate: any, rating: number, addedToWatchlist: boolean, watched: boolean, reviews: Array<{ __typename?: 'Review', id: string, review: string, createdBy: { __typename?: 'User', id: string, name: string } }>, userReview?: { __typename?: 'Review', id: string, rating: number, review: string } | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string }> };

export type ReviewMovieMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  review: Scalars['String'];
}>;


export type ReviewMovieMutation = { __typename?: 'Mutation', reviewMovie: { __typename?: 'Review', media: { __typename?: 'Movie', id: string, reviews: Array<{ __typename?: 'Review', review: string, createdBy: { __typename?: 'User', id: string, name: string } }> } | { __typename?: 'Tv' } } };

export type RecommendMovieMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  userId: Scalars['ID'];
  message: Scalars['String'];
}>;


export type RecommendMovieMutation = { __typename?: 'Mutation', createRecommendation: { __typename?: 'Recommendation', id: string } };

export type AddMovieToWatchlistMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type AddMovieToWatchlistMutation = { __typename?: 'Mutation', addToWatchlist: { __typename?: 'Movie', id: string, addedToWatchlist: boolean } | { __typename?: 'Tv' } };

export type RemoveMovieFromWatchlistMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type RemoveMovieFromWatchlistMutation = { __typename?: 'Mutation', removeFromWatchlist: { __typename?: 'Movie', id: string, addedToWatchlist: boolean } | { __typename?: 'Tv' } };

export type ToggleMovieWatchedMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type ToggleMovieWatchedMutation = { __typename?: 'Mutation', toggleWatched: { __typename: 'Movie', id: string, watched: boolean } | { __typename: 'Tv' } };

export type RateMovieMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  rating: Scalars['Float'];
}>;


export type RateMovieMutation = { __typename?: 'Mutation', rateMovie: { __typename?: 'Review', media: { __typename?: 'Movie', id: string, rating: number } | { __typename?: 'Tv' } } };

export type RecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendationsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, recommendations: Array<{ __typename?: 'Recommendation', id: string, message: string, media: { __typename: 'Movie', id: string, tmdbId: string, title: string, tagline: string, releaseDate: any, posterPath: string, genres: Array<string> } | { __typename: 'Tv', id: string, tmdbId: string, name: string, tagline: string, firstAirDate: any, posterPath: string, genres: Array<string> }, recommendedBy: { __typename?: 'User', id: string, name: string } }> } };

export type TvQueryVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type TvQuery = { __typename?: 'Query', tv?: { __typename?: 'Tv', id: string, tmdbId: string, name: string, tagline: string, posterPath: string, backdropPath: string, genres: Array<string>, firstAirDate: any, rating: number, addedToWatchlist: boolean, watched: boolean, reviews: Array<{ __typename?: 'Review', id: string, review: string, createdBy: { __typename?: 'User', id: string, name: string } }>, userReview?: { __typename?: 'Review', id: string, rating: number, review: string } | null } | null };

export type ReviewTvMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  review: Scalars['String'];
}>;


export type ReviewTvMutation = { __typename?: 'Mutation', reviewTv: { __typename?: 'Review', media: { __typename?: 'Movie' } | { __typename?: 'Tv', id: string, reviews: Array<{ __typename?: 'Review', review: string, createdBy: { __typename?: 'User', id: string, name: string } }> } } };

export type RecommendTvMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  userId: Scalars['ID'];
  message: Scalars['String'];
}>;


export type RecommendTvMutation = { __typename?: 'Mutation', createRecommendation: { __typename?: 'Recommendation', id: string } };

export type AddTvToWatchlistMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type AddTvToWatchlistMutation = { __typename?: 'Mutation', addToWatchlist: { __typename?: 'Movie' } | { __typename?: 'Tv', id: string, addedToWatchlist: boolean } };

export type RemoveTvFromWatchlistMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type RemoveTvFromWatchlistMutation = { __typename?: 'Mutation', removeFromWatchlist: { __typename?: 'Movie' } | { __typename?: 'Tv', id: string, addedToWatchlist: boolean } };

export type ToggleTvWatchedMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type ToggleTvWatchedMutation = { __typename?: 'Mutation', toggleWatched: { __typename: 'Movie' } | { __typename: 'Tv', id: string, watched: boolean } };

export type RateTvMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  rating: Scalars['Float'];
}>;


export type RateTvMutation = { __typename?: 'Mutation', rateTv: { __typename?: 'Review', media: { __typename?: 'Movie' } | { __typename?: 'Tv', id: string, rating: number } } };

export type WatchlistQueryVariables = Exact<{ [key: string]: never; }>;


export type WatchlistQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, watchlist: Array<{ __typename: 'Movie', id: string, tmdbId: string, title: string, tagline: string, releaseDate: any, posterPath: string, genres: Array<string> } | { __typename: 'Tv', id: string, tmdbId: string, name: string, tagline: string, firstAirDate: any, posterPath: string, genres: Array<string> }> } };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'RefreshTokenResult', accessToken: string, refreshToken: string } };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tmdb"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"totalResults"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const DiscoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Discover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discoverMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoverTvs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"movieSuggestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}}]}}]}}]} as unknown as DocumentNode<DiscoverQuery, DiscoverQueryVariables>;
export const UserFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recommendation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"firstAirDate"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UserFeedQuery, UserFeedQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInWithJellyfinInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInWithJellyfin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MyIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MyIdQuery, MyIdQueryVariables>;
export const MovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}},{"kind":"Field","name":{"kind":"Name","value":"certification"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]} as unknown as DocumentNode<MovieQuery, MovieQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const ReviewMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReviewMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"review"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"review"},"value":{"kind":"Variable","name":{"kind":"Name","value":"review"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReviewMovieMutation, ReviewMovieMutationVariables>;
export const RecommendMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecommendMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecommendation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"recommendationForUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RecommendMovieMutation, RecommendMovieMutationVariables>;
export const AddMovieToWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMovieToWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]}}]} as unknown as DocumentNode<AddMovieToWatchlistMutation, AddMovieToWatchlistMutationVariables>;
export const RemoveMovieFromWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMovieFromWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveMovieFromWatchlistMutation, RemoveMovieFromWatchlistMutationVariables>;
export const ToggleMovieWatchedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleMovieWatched"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleWatched"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleMovieWatchedMutation, ToggleMovieWatchedMutationVariables>;
export const RateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RateMovieMutation, RateMovieMutationVariables>;
export const RecommendationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"firstAirDate"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RecommendationsQuery, RecommendationsQueryVariables>;
export const TvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"firstAirDate"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]} as unknown as DocumentNode<TvQuery, TvQueryVariables>;
export const ReviewTvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReviewTv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"review"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewTv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"review"},"value":{"kind":"Variable","name":{"kind":"Name","value":"review"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReviewTvMutation, ReviewTvMutationVariables>;
export const RecommendTvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecommendTv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecommendation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"TV"}},{"kind":"ObjectField","name":{"kind":"Name","value":"recommendationForUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RecommendTvMutation, RecommendTvMutationVariables>;
export const AddTvToWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTVToWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"TV"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]}}]} as unknown as DocumentNode<AddTvToWatchlistMutation, AddTvToWatchlistMutationVariables>;
export const RemoveTvFromWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTVFromWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"TV"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveTvFromWatchlistMutation, RemoveTvFromWatchlistMutationVariables>;
export const ToggleTvWatchedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleTVWatched"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleWatched"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"TV"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleTvWatchedMutation, ToggleTvWatchedMutationVariables>;
export const RateTvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateTv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateTv"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RateTvMutation, RateTvMutationVariables>;
export const WatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Watchlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"watchlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tv"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"firstAirDate"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WatchlistQuery, WatchlistQueryVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;