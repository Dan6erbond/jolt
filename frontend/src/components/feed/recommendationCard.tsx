import {
  ActionIcon,
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
import Poster from "../media/poster";
import UserAvatar from "../user/userAvatar";

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
      <Group align="start">
        <Poster size="sm" model={recommendation.media} asLink={false} />
        <Group
          sx={{
            alignSelf: "stretch",
            flex: 1,
            justifyContent: "space-between",
          }}
          align="start"
        >
          <Stack p="sm" spacing="xs">
            <Title size="h4" color="white">
              {recommendation.media.__typename === "Movie"
                ? recommendation.media.title
                : recommendation.media.__typename === "Tv"
                ? recommendation.media.name
                : ""}{" "}
              <Text component="span">
                (
                {recommendation.media.__typename === "Movie"
                  ? recommendation.media.releaseDate.substring(0, 4)
                  : recommendation.media.__typename === "Tv"
                  ? recommendation.media.firstAirDate.substring(0, 4)
                  : ""}
                )
              </Text>
            </Title>
            <Text color={theme.colors.gray[4]}>
              {recommendation.media.__typename === "Movie"
                ? recommendation.media.genres.join(", ")
                : recommendation.media.__typename === "Tv"
                ? recommendation.media.genres.join(", ")
                : ""}
            </Text>
            <Group>
              <Group spacing="xs" align="start">
                <UserAvatar
                  radius="xl"
                  color="cyan"
                  user={recommendation.recommendedBy}
                />
                <Paper p="md" bg={theme.colors.dark[3]} miw="200px">
                  <Text color={theme.colors.gray[4]} size="sm">
                    {recommendation.recommendedBy.name}
                  </Text>
                  <Text color="white">{recommendation.message}</Text>
                </Paper>
              </Group>
              <Tooltip label="I'm not implemented yet">
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  color="gray"
                  onClick={(e) => e.preventDefault()}
                  disabled
                  size="lg"
                  sx={{ cursor: "not-allowed" }}
                >
                  <IconBolt />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Box h="auto" />
          </Stack>
          <Group align="end" sx={{ alignSelf: "end" }}>
            <IconCircleChevronRight color={theme.colors.blue[2]} />
          </Group>
        </Group>
      </Group>
    </Paper>
  );
};

export default RecommendationCard;
