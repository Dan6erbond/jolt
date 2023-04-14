import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconClockHour4,
  IconExclamationCircle,
  IconSquareRoundedArrowRight,
} from "@tabler/icons";
import { TbEyeCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import Poster from "../components/poster";

interface MediaCardProps {
  media:
    | {
        __typename?: "Tv";
        id: string;
        tmdbId: string;
        name: string;
        overview: string;
        genres: string[];
        posterPath: string;
        firstAirDate: string;
        watched?: boolean;
        addedToWatchlist?: boolean;
      }
    | {
        __typename?: "Movie";
        id: string;
        tmdbId: string;
        jellyfinUrl?: string | null;
        title: string;
        overview: string;
        genres: string[];
        posterPath: string;
        releaseDate: string;
        watched?: boolean;
        addedToWatchlist?: boolean;
      };
  showToggleWatched?: boolean;
  showToggleWatchlist?: boolean;
  showAddReview?: boolean;
}

const MediaCard = ({
  media,
  showToggleWatched,
  showToggleWatchlist,
  showAddReview,
}: MediaCardProps) => {
  const theme = useMantineTheme();

  return (
    <Paper p="lg">
      <Group>
        <Poster model={media} size="sm" />
        <Group
          sx={{ justifyContent: "space-between", flexGrow: 1, flexBasis: 1 }}
          align="stretch"
        >
          <Stack sx={{ flexBasis: 1, flexGrow: 1 }}>
            <Title size="h4" color="white">
              {media.__typename == "Movie"
                ? media.title
                : media.__typename == "Tv"
                ? media.name
                : ""}{" "}
              <Text component="span">
                (
                {media.__typename == "Movie"
                  ? media.releaseDate.split("-")[0]
                  : media.__typename == "Tv"
                  ? media.firstAirDate.split("-")[0]
                  : ""}
                )
              </Text>
            </Title>
            <Text color={theme.colors.gray[4]}>
              {media.genres.map((genre) => genre).join(", ")}
            </Text>
            <Text color={theme.colors.gray[2]}>{media.overview}</Text>
            {showAddReview && (
              <Group>
                <Tooltip label="You are seeing this because you haven't added a review yet">
                  <IconExclamationCircle color={theme.colors.gray[6]} />
                </Tooltip>
                <Anchor
                  component={Link}
                  to={
                    (media.__typename == "Movie"
                      ? "/movies/"
                      : media.__typename == "Tv"
                      ? "/tv/"
                      : "") + media.id
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                    ":hover": {
                      textDecoration: "none",
                      color: theme.colors.orange[4],
                    },
                  }}
                  color="orange.3"
                >
                  <Text component="span">Would you like to add a review? </Text>
                  <IconSquareRoundedArrowRight />
                </Anchor>
              </Group>
            )}
          </Stack>
          <Stack justify="space-between" sx={{ flexShrink: 0 }}>
            <Group sx={{ justifyContent: "end" }}>
              {showToggleWatched && (
                <Tooltip label="Watched">
                  <ActionIcon size="lg">
                    <TbEyeCheck
                      size={20}
                      color={media.watched ? theme.colors.yellow[6] : "white"}
                    />
                  </ActionIcon>
                </Tooltip>
              )}
              {showToggleWatchlist && (
                <Tooltip label="Add to Watchlist">
                  <ActionIcon>
                    <IconClockHour4
                      color={
                        media.addedToWatchlist
                          ? theme.colors.yellow[6]
                          : "white"
                      }
                    />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
            <Group>
              <Box h="auto" />
              {media.__typename === "Movie" && media.jellyfinUrl && (
                <Button
                  variant="subtle"
                  radius="xl"
                  component="a"
                  href={media.jellyfinUrl}
                  target="_blank"
                >
                  <Image
                    src="https://jellyfin.ravianand.me/web/assets/img/banner-light.png"
                    height={25}
                  />
                </Button>
              )}
              {/* <Button variant="subtle" radius="xl">
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                height={25}
              />
            </Button> */}
            </Group>
          </Stack>
        </Group>
      </Group>
    </Paper>
  );
};

export default MediaCard;
