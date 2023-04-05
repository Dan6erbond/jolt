import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconBolt, IconCircleChevronRight } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Poster from "../components/poster";
import { useTmdbClient } from "../tmdb/context";
import { MovieDetails } from "../tmdb/types/movie";

interface RecommendationCardProps {
  recommendation: {
    id: string;
    media: { __typename?: "Movie" | undefined; id: string; tmdbId: string };
    message: string;
    recommendedBy: {
      __typename?: "User" | undefined;
      id: string;
      name: string;
    };
  };
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const theme = useMantineTheme();
  const tmdbClient = useTmdbClient();
  const [movie, setMovie] = useState<MovieDetails | undefined>();

  useEffect(() => {
    (async () => {
      if (recommendation?.media.__typename === "Movie") {
        const movieDetails = await tmdbClient.getMovieDetails({
          movieId: recommendation.media.tmdbId,
        });
        setMovie(movieDetails);
      }
    })();
  }, [recommendation, tmdbClient, setMovie]);

  return (
    <Paper
      component={Link}
      to={`/movies/${movie?.id}`}
      p="lg"
      sx={{ ":hover": { backgroundColor: theme.colors.dark[6] } }}
    >
      <Group>
        <Poster size="xs" model={movie} asLink={false} />
        <Stack
          sx={{ alignSelf: "stretch", flexGrow: 1 }}
          align="start"
          p="sm"
          spacing="xs"
        >
          <Title size="h4" color="white">
            Avatar: The Way of Water <Text component="span">(2022)</Text>
          </Title>
          <Text color={theme.colors.gray[4]}>
            Science Fiction, Adventure, Action
          </Text>
          <Group>
            <Group spacing="xs">
              <Avatar radius="xl">
                <Avatar radius="xl">
                  {recommendation.recommendedBy.name
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
                </Avatar>
              </Avatar>
              <Text color={theme.colors.gray[4]}>
                {recommendation.recommendedBy.name}
              </Text>
            </Group>
            <Paper p="sm" radius="lg" bg={theme.colors.dark[5]}>
              <Text color="white">{recommendation.message}</Text>
            </Paper>
            <Tooltip label="I'm not implemented yet">
              <ActionIcon
                variant="subtle"
                radius="xl"
                color="gray"
                onClick={(e) => e.preventDefault()}
                disabled
                sx={{ cursor: "not-allowed" }}
              >
                <IconBolt />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Box h="auto" />
          <Group align="end" sx={{ alignSelf: "end" }}>
            <ActionIcon variant="subtle" radius="xl" color="blue">
              <IconCircleChevronRight />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default RecommendationCard;
