import { useQuery } from "@apollo/client";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Image,
  Paper,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TbEyeCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import { graphql } from "../gql";
import { useTmdbClient } from "../tmdb/context";
import { MovieDetails } from "../tmdb/types/movie";

export const MovieCard = ({ tmdbId }: { tmdbId: string }) => {
  const theme = useMantineTheme();
  const tmdbClient = useTmdbClient();
  const [movieData, setMovieData] = useState<MovieDetails>();

  useEffect(() => {
    (async () => {
      const details = await tmdbClient.getMovieDetails({ movieId: tmdbId });
      setMovieData(details);
    })();
  }, [tmdbClient, tmdbId, setMovieData]);

  return (
    <Paper p="lg">
      <Group>
        <Link to={`/movies/${tmdbId}`}>
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            sx={{
              flexShrink: 0,
              transition: "transform 0.15s ease",
              ":hover": { transform: "scale(1.1)" },
            }}
          >
            <Card.Section>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`}
                height={125}
                width={2000 * (125 / 3000)}
                alt={"Avatar: The Way of Water"}
                withPlaceholder
                placeholder={
                  <Skeleton height={125} width={2000 * (125 / 3000)} />
                }
              />
            </Card.Section>
          </Card>
        </Link>
        <Stack
          sx={{ alignSelf: "stretch", flexGrow: 1 }}
          align="stretch"
          p="sm"
          spacing="xs"
        >
          <Group sx={{ justifyContent: "space-between" }} align="start">
            <Stack>
              <Title size="h4" color="white">
                {movieData?.title}{" "}
                <Text component="span">
                  ({movieData?.release_date.split("-")[0]})
                </Text>
              </Title>
              <Text color={theme.colors.gray[4]}>
                {movieData?.genres.map((genre) => genre.name).join(", ")}
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
        {data?.me.watchlist.map((movie) => (
          <MovieCard tmdbId={movie.tmdbId} key={movie.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default Watchlist;
