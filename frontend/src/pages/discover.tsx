import { useQuery } from "@apollo/client";
import { Group, ScrollArea, Stack, Title } from "@mantine/core";
import Poster from "../components/poster";
import { graphql } from "../gql";

const Discover = () => {
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
        discoverTvs {
          id
          tmdbId
          name
          posterPath
          backdropPath
        }
      }
    `),
  );

  return (
    <Stack spacing="md">
      <Title color="white">Movies</Title>
      <ScrollArea styles={{ viewport: { overflowY: "hidden" } }}>
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
      <ScrollArea styles={{ viewport: { overflowY: "hidden" } }}>
        <Group
          sx={{
            flexWrap: "nowrap",
          }}
        >
          {data?.discoverTvs
            ? data.discoverTvs.map((show) => (
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
