import { useQuery } from "@apollo/client";
import { Group, ScrollArea, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Poster from "../components/poster";
import { graphql } from "../gql";
import { useTmdbClient } from "../tmdb/context";
import { Tv } from "../tmdb/types/tv";

const Discover = () => {
  const tmdbClient = useTmdbClient();

  const [shows, setShows] = useState<Array<Tv> | undefined>();

  const { data } = useQuery(
    graphql(`
      query Discover {
        discoverMovies {
          id
          tmdbId
          title
          posterPath
          backdropPath
        }
      }
    `),
  );

  useEffect(() => {
    (async () => {
      const { results } = await tmdbClient.discoverTv();
      setShows(results);
    })();
  }, [setShows, tmdbClient]);

  return (
    <Stack spacing="md">
      <Title color="white">Movies</Title>
      <ScrollArea>
        <Group
          sx={{
            flexWrap: "nowrap",
          }}
        >
          {data?.discoverMovies
            ? data?.discoverMovies.map((movie) => (
                <Poster key={movie.id} size="lg" model={movie} />
              ))
            : new Array(10)
                .fill(undefined)
                .map((_, idx) => <Poster key={idx} size="lg" />)}
        </Group>
      </ScrollArea>
      <Title color="white">Shows</Title>
      <ScrollArea>
        <Group
          sx={{
            flexWrap: "nowrap",
          }}
        >
          {shows
            ? shows.map((show) => (
                <Poster key={show.id} size="lg" model={show} />
              ))
            : new Array(10)
                .fill(undefined)
                .map((_, idx) => <Poster key={idx} size="lg" />)}
        </Group>
      </ScrollArea>
    </Stack>
  );
};

export default Discover;
