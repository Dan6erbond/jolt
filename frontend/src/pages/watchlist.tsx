import { useQuery } from "@apollo/client";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TbEyeCheck } from "react-icons/tb";
import Poster from "../components/poster";
import { graphql } from "../gql";

interface MediaCardProps {
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
}

export const MediaCard = ({ media }: MediaCardProps) => {
  const theme = useMantineTheme();

  return (
    <Paper p="lg">
      <Group>
        <Poster model={media} size="sm" />
        <Stack
          sx={{ alignSelf: "stretch", flexGrow: 1 }}
          align="stretch"
          p="sm"
          spacing="xs"
        >
          <Group sx={{ justifyContent: "space-between" }} align="start">
            <Stack>
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
            </Stack>
            <Tooltip label="Watched">
              <ActionIcon size="lg">
                <TbEyeCheck size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Box h="auto" />
          <Group align="end" sx={{ alignSelf: "end" }}>
            <Button variant="subtle" radius="xl">
              <Image
                src="https://jellyfin.ravianand.me/web/assets/img/banner-light.png"
                height={25}
              />
            </Button>
            <Button variant="subtle" radius="xl">
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                height={25}
              />
            </Button>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

const Watchlist = () => {
  const { data } = useQuery(
    graphql(`
      query Watchlist {
        me {
          id
          watchlist {
            __typename
            ... on Movie {
              id
              tmdbId
              title
              tagline
              releaseDate
              posterPath
              genres
            }
            ... on Tv {
              id
              tmdbId
              name
              tagline
              firstAirDate
              posterPath
              genres
            }
          }
        }
      }
    `),
  );

  return (
    <Box>
      <Group>
        <AiOutlineFieldTime color="white" size={52} />
        <Title color="white">Watchlist</Title>
      </Group>
      <Space h="lg" />
      <Stack>
        {data?.me.watchlist.map((media) => (
          <MediaCard media={media} key={media.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default Watchlist;
