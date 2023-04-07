import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  makeVar,
  ServerError,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { graphql } from "../gql";

type SessionError = "REFRESH_TOKEN_EXPIRED";

export const sessionError = makeVar<SessionError | null>(null);
export const loggedIn = makeVar(localStorage.getItem("refreshToken") !== null);
export const accessToken = makeVar<string | null>(null);
export const refreshingTokens = makeVar(false);

const httpLink = createHttpLink({
  uri: import.meta.env.DEV ? "http://localhost:5001/graphql" : "/graphql",
});

const refreshTokenErrors = [
  "refresh token invalid",
  "refresh token has been revoked",
  "token malformed",
  "token expired or inactive",
  "couldn't parse token",
  "couldn't parse token claims",
];

const authLink = setContext(async (_, { headers }) => {
  if (refreshingTokens()) {
    await new Promise((resolve) => {
      refreshingTokens.onNextChange((refreshingTokens) =>
        resolve(refreshingTokens),
      );
    });
  }
  if (accessToken() === null) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      refreshingTokens(true);
      const { data, errors } = await getClient().mutate({
        mutation: graphql(`
          mutation RefreshTokens($refreshToken: String!) {
            refreshTokens(refreshToken: $refreshToken) {
              accessToken
              refreshToken
            }
          }
        `),
        variables: { refreshToken },
      });
      if (
        errors?.[0].message &&
        refreshTokenErrors.includes(errors?.[0].message)
      ) {
        localStorage.removeItem("refreshToken");
        sessionError("REFRESH_TOKEN_EXPIRED");
        refreshingTokens(false);
      }
      if (data) {
        localStorage.setItem("refreshToken", data.refreshTokens.refreshToken);
        accessToken(data.refreshTokens.accessToken);
        refreshingTokens(false);

        return {
          headers: {
            ...headers,
            authorization: `Bearer ${data.refreshTokens.accessToken}`,
          },
        };
      }
    }
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken() ? `Bearer ${accessToken()}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      if (graphQLErrors[0].message === "you aren't authenticated") {
        accessToken(null);
      }
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      if ((networkError as ServerError).statusCode === 401) {
        accessToken(null);
      }
      console.error(`[Network error]: ${networkError}`);
    }
    return forward(operation);
  },
);

const getClient = (authLink?: ApolloLink) => {
  let link: ApolloLink = errorLink.concat(httpLink);
  if (authLink) {
    link = authLink.concat(link);
  }

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export const client = getClient(authLink);
