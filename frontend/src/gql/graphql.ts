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

export type Query = {
  __typename?: 'Query';
  discoverMovies: Array<Movie>;
  discoverTvs: Array<Tv>;
  me: User;
  movie: Movie;
  tv: Tv;
  userFeed: Array<FeedItem>;
  users: Array<User>;
};


export type QueryMovieArgs = {
  id?: InputMaybe<Scalars['ID']>;
  tmdbId?: InputMaybe<Scalars['ID']>;
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

export type SignInResult = {
  __typename?: 'SignInResult';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type SignInWithJellyfinInput = {
  password: Scalars['String'];
  username: Scalars['String'];
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

export type DiscoverQueryVariables = Exact<{ [key: string]: never; }>;


export type DiscoverQuery = { __typename?: 'Query', discoverMovies: Array<{ __typename?: 'Movie', id: string, tmdbId: string, title: string, posterPath: string, backdropPath: string }>, discoverTvs: Array<{ __typename?: 'Tv', id: string, tmdbId: string, name: string, posterPath: string, backdropPath: string }> };

export type LoginMutationVariables = Exact<{
  input: SignInWithJellyfinInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signInWithJellyfin: { __typename?: 'SignInResult', accessToken: string, refreshToken: string } };

export type MyIdQueryVariables = Exact<{ [key: string]: never; }>;


export type MyIdQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string } };

export type MovieQueryVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type MovieQuery = { __typename?: 'Query', movie: { __typename?: 'Movie', id: string, title: string, tagline: string, posterPath: string, backdropPath: string, certification?: string | null, genres: Array<string>, releaseDate: any, rating: number, addedToWatchlist: boolean, reviews: Array<{ __typename?: 'Review', id: string, review: string, createdBy: { __typename?: 'User', id: string, name: string } }>, userReview?: { __typename?: 'Review', id: string, rating: number, review: string } | null } };

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

export type AddToWatchlistMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type AddToWatchlistMutation = { __typename?: 'Mutation', addToWatchlist: { __typename?: 'Movie', id: string, addedToWatchlist: boolean } | { __typename?: 'Tv' } };

export type RemoveFromWatchlistMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
}>;


export type RemoveFromWatchlistMutation = { __typename?: 'Mutation', removeFromWatchlist: { __typename?: 'Movie', id: string, addedToWatchlist: boolean } | { __typename?: 'Tv' } };

export type RateMovieMutationVariables = Exact<{
  tmdbId: Scalars['ID'];
  rating: Scalars['Float'];
}>;


export type RateMovieMutation = { __typename?: 'Mutation', rateMovie: { __typename?: 'Review', media: { __typename?: 'Movie', id: string, rating: number, userReview?: { __typename?: 'Review', id: string, rating: number, review: string } | null } | { __typename?: 'Tv' } } };

export type RecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendationsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, recommendations: Array<{ __typename?: 'Recommendation', id: string, message: string, media: { __typename: 'Movie', id: string, tmdbId: string } | { __typename: 'Tv' }, recommendedBy: { __typename?: 'User', id: string, name: string } }> } };

export type WatchlistQueryVariables = Exact<{ [key: string]: never; }>;


export type WatchlistQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, watchlist: Array<{ __typename: 'Movie', id: string, tmdbId: string } | { __typename: 'Tv' }> } };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'RefreshTokenResult', accessToken: string, refreshToken: string } };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const DiscoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Discover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discoverMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discoverTvs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}}]}}]}}]} as unknown as DocumentNode<DiscoverQuery, DiscoverQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInWithJellyfinInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInWithJellyfin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MyIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MyIdQuery, MyIdQueryVariables>;
export const MovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"backdropPath"}},{"kind":"Field","name":{"kind":"Name","value":"certification"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]} as unknown as DocumentNode<MovieQuery, MovieQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const ReviewMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReviewMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"review"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"review"},"value":{"kind":"Variable","name":{"kind":"Name","value":"review"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReviewMovieMutation, ReviewMovieMutationVariables>;
export const RecommendMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecommendMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecommendation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"recommendationForUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RecommendMovieMutation, RecommendMovieMutationVariables>;
export const AddToWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]}}]} as unknown as DocumentNode<AddToWatchlistMutation, AddToWatchlistMutationVariables>;
export const RemoveFromWatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromWatchlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWatchlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"mediaType"},"value":{"kind":"EnumValue","value":"MOVIE"}},{"kind":"ObjectField","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addedToWatchlist"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>;
export const RateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tmdbId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tmdbId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"userReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"review"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RateMovieMutation, RateMovieMutationVariables>;
export const RecommendationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RecommendationsQuery, RecommendationsQueryVariables>;
export const WatchlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Watchlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"watchlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tmdbId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WatchlistQuery, WatchlistQueryVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;