import { Movie, MovieDetails, MovieReleaseDates } from "./types/movie";
import { MultiSearchResultItem } from "./types/multiSearch";
import { PaginatedResult } from "./types/pagination";
import { Tv } from "./types/tv";

export interface TmdbClientOptions {
  apiKey: string;
}

export interface MultiSearchFetchOptions {
  query: string;
}

export interface GetMovieDetailsFetchOptions {
  movieId: string;
}

export interface GetMovieReleaseDatesFetchOptions {
  movieId: string;
}

export class TmdbClient {
  protected apiKey: string;
  protected apiRoot: string = "https://api.themoviedb.org/3";

  constructor({ apiKey }: TmdbClientOptions) {
    this.apiKey = apiKey;
  }

  public async multiSearch({ query }: MultiSearchFetchOptions) {
    const url = new URL(`${this.apiRoot}/search/multi`);
    url.searchParams.append("api_key", this.apiKey);
    url.searchParams.append("query", query);
    const res = await fetch(url.toString());
    return (await res.json()) as PaginatedResult<MultiSearchResultItem>;
  }

  public async discoverMovie() {
    const url = new URL(`${this.apiRoot}/discover/movie`);
    url.searchParams.append("api_key", this.apiKey);
    const res = await fetch(url.toString());
    return (await res.json()) as PaginatedResult<Movie>;
  }

  public async discoverTv() {
    const url = new URL(`${this.apiRoot}/discover/tv`);
    url.searchParams.append("api_key", this.apiKey);
    const res = await fetch(url.toString());
    return (await res.json()) as PaginatedResult<Tv>;
  }

  public async getMovieDetails({ movieId }: GetMovieDetailsFetchOptions) {
    const url = new URL(`${this.apiRoot}/movie/${movieId}`);
    url.searchParams.append("api_key", this.apiKey);
    const res = await fetch(url.toString());
    return (await res.json()) as MovieDetails;
  }

  public async getMovieReleaseDates({
    movieId,
  }: GetMovieReleaseDatesFetchOptions) {
    const url = new URL(`${this.apiRoot}/movie/${movieId}/release_dates`);
    url.searchParams.append("api_key", this.apiKey);
    const res = await fetch(url.toString());
    return (await res.json()) as MovieReleaseDates;
  }
}
