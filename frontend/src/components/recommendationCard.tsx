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
import { Link } from "react-router-dom";
import Poster from "../components/poster";

interface RecommendationCardProps {
  recommendation: {
    id: string;
    media:
      | {
          __typename?: "Tv";
          id: string;
          tmdbId: string;
          name: string;
          genres: string[];
          posterPath: string;
          firstAirDate: string;
        }
      | {
          __typename?: "Movie";
          id: string;
          tmdbId: string;
          title: string;
          genres: string[];
          posterPath: string;
          releaseDate: string;
        };
    message: string;
    recommendedBy: {
      __typename?: "User";
      id: string;
      name: string;
    };
  };
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const theme = useMantineTheme();

  return (
    <Paper
      component={Link}
      to={
        recommendation.media.__typename == "Movie"
          ? `/movies/${recommendation.media?.tmdbId}`
          : recommendation.media.__typename == "Tv"
          ? `/tv/${recommendation.media?.tmdbId}`
          : ""
      }
      p="lg"
      sx={{ ":hover": { backgroundColor: theme.colors.dark[6] } }}
    >
      <Group>
        <Poster size="xs" model={recommendation.media} asLink={false} />
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
