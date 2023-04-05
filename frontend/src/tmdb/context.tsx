import React from "react";
import { TmdbClient } from "./client";

const TmdbClientContext = React.createContext<TmdbClient | null>(null);

const TmdbClientProvider = ({
  client,
  ...props
}: {
  client: TmdbClient;
  children: React.ReactNode;
}) => {
  return <TmdbClientContext.Provider value={client} {...props} />;
};

export default TmdbClientProvider;

export const useTmdbClient = () => {
  const tmdbClient = React.useContext(TmdbClientContext);

  if (tmdbClient === null) {
    throw new Error(
      "TMDB client needs to be initialized in a TmdbClientProvider",
    );
  }

  return tmdbClient;
};
