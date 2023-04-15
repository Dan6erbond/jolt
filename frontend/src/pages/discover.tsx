import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Poster from "../components/media/poster";
import { graphql } from "../gql";

const Discover = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

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
        movieSuggestions {
          id
          tmdbId
          title
          tagline
          posterPath
          backdropPath
        }
      }
    `),
  );

  return (
    <Stack spacing="md">
      <Title color="white">Movies For You</Title>
      <Carousel
        withIndicators
        height={500}
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {data?.movieSuggestions.map((suggestion) => (
          <Carousel.Slide key={suggestion.id}>
            <Paper>
              <Box h={470} sx={{ overflow: "hidden", position: "relative" }}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${suggestion.backdropPath}`}
                  sx={{ objectPosition: "center", objectFit: "contain" }}
                />
                <Box
                  sx={(theme) => ({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.fn.linearGradient(
                      360,
                      theme.fn.rgba(theme.colors.dark[6], 0.8),
                      theme.fn.rgba(theme.colors.dark[6], 0.8),
                      theme.fn.rgba(theme.colors.dark[6], 0),
                    ),
                  })}
                >
                  <Stack justify="end" h="100%" p="lg" spacing="xs">
                    <Title order={3} color="white">
                      {suggestion.title}
                    </Title>
                    <Text sx={(theme) => ({ color: theme.colors.gray[3] })}>
                      {suggestion.tagline}
                    </Text>
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Carousel.Slide>
        ))}
      </Carousel>
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
