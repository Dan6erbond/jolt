import { Group, ScrollArea, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Poster from "../components/poster";
import { useTmdbClient } from "../tmdb/context";
import { Movie } from "../tmdb/types/movie";
import { Tv } from "../tmdb/types/tv";

const Discover = () => {
  const tmdbClient = useTmdbClient();

  const [movies, setMovies] = useState<Array<Movie> | undefined>();
  const [shows, setShows] = useState<Array<Tv> | undefined>();

  useEffect(() => {
    (async () => {
      const { results } = await tmdbClient.discoverMovie();
      setMovies(results);
    })();
    (async () => {
      const { results } = await tmdbClient.discoverTv();
      setShows(results);
    })();
  }, [setMovies, setShows, tmdbClient]);

  return (
    <Stack spacing="md">
      <Title color="white">Movies</Title>
      <ScrollArea>
        <Group
          sx={{
            flexWrap: "nowrap",
          }}
        >
          {movies
            ? movies.map((movie) => (
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
