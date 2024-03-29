import { useLazyQuery } from "@apollo/client";
import { graphql } from "../gql";

export const useSearch = () =>
  useLazyQuery(
    graphql(`
      query Search($query: String!, $page: Int) {
        search(query: $query) {
          profiles {
            id
            profileImageUrl
            name
          }
          tmdb(page: $page) {
            page
            totalPages
            totalResults
            results {
              __typename
              ... on Movie {
                id
                tmdbId
                title
                posterPath
              }
              ... on Tv {
                id
                tmdbId
                name
                posterPath
              }
            }
          }
        }
      }
    `),
  );
