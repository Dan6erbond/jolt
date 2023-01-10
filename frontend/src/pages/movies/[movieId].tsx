import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Rating,
  Select,
  Skeleton,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconClockHour4,
  IconEyeCheck,
  IconSend,
  IconUserPlus,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Poster from "../../components/poster";
import { useTmdbClient } from "../../tmdb/context";
import { MovieDetails } from "../../tmdb/types/movie";

const Movie = () => {
  const { movieId } = useParams();
  const tmdbClient = useTmdbClient();
  const theme = useMantineTheme();

  const [movie, setMovie] = useState<MovieDetails | undefined>();

  const [showRecommendationModal, setShowRecommendationModal] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const movie = await tmdbClient.getMovieDetails({
        movieId: parseInt(movieId as string),
      });
      setMovie(movie);
    })();
  }, [setMovie, movieId, tmdbClient]);

  return (
    <Box>
      <Modal
        opened={showRecommendationModal}
        onClose={() => setShowRecommendationModal((show) => !show)}
        title="Recommend movie"
        centered
        styles={(theme) => ({
          title: { color: "white" },
          modal: {
            background: theme.fn.linearGradient(
              45,
              theme.fn.rgba(theme.colors.dark[3], 0.7),
              theme.fn.rgba(theme.colors.dark[6], 0.7)
            ),
            backdropFilter: "blur(10px)",
          },
        })}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.65}
        overlayBlur={3}
      >
        <Stack>
          <Flex gap="md">
            <Poster model={movie} size="sm" />
            <Stack spacing="xs" sx={{ flexGrow: 1 }}>
              <Title color="white" size="h3" sx={{ wordWrap: "break-word" }}>
                {movie?.title}{" "}
                <Text component="span" size="xl">
                  ({movie?.release_date.slice(0, 4)})
                </Text>
              </Title>
              <Text color={theme.colors.gray[4]}>
                {movie?.genres
                  .map(({ name }: { id: number; name: string }) => name)
                  .join(", ")}
              </Text>
              <Rating value={2} readOnly />
            </Stack>
          </Flex>
          <Select
            data={["John Doe"]}
            searchable
            styles={{
              input: {
                border: `1px solid ${theme.colors.dark[1]}`,
                color: "white",
                "::placeholder": { color: theme.colors.gray[4] },
              },
              dropdown: {
                color: theme.colors.gray[4],
              },
            }}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={30}
          />
          <Textarea
            label="Tell them your thoughts"
            placeholder="Tell them your thoughts"
            styles={(theme) => ({
              input: {
                border: `1px solid ${theme.colors.dark[1]}`,
                color: "white",
                "::placeholder": { color: theme.colors.gray[4] },
              },
              label: { color: "white" },
            })}
          />
          <Button
            sx={{ alignSelf: "end" }}
            variant="light"
            radius="lg"
            rightIcon={<IconSend />}
          >
            Recommend
          </Button>
        </Stack>
      </Modal>
      <Box style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={
            movie && `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          }
          styles={{
            image: {
              maxHeight: "min(50vh, 600px)",
              objectPosition: "center top",
            },
          }}
        />
        <Box
          style={{
            backgroundImage:
              "linear-gradient(rgba(17, 24, 39, 0.47) 0%, rgb(17, 24, 39) 100%)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {movie && (
          <Box
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Stack p="md" spacing="sm">
              <Flex align="end" gap="md">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  height={200}
                  width={2000 * (200 / 3000)}
                  alt={movie.original_title}
                  withPlaceholder
                  placeholder={
                    <Skeleton height={300} width={2000 * (300 / 3000)} />
                  }
                  styles={{ image: { borderRadius: "10px" } }}
                />
                <Stack spacing="xs">
                  <Title color="white">
                    {movie.title}{" "}
                    <Text component="span" size="xl">
                      ({movie.release_date.slice(0, 4)})
                    </Text>
                  </Title>
                  <Text color="white">
                    {movie.genres
                      .map(({ name }: { id: number; name: string }) => name)
                      .join(", ")}
                  </Text>
                </Stack>
                <Box style={{ flexGrow: 1 }} />
                <Tooltip label="Watched">
                  <ActionIcon>
                    <IconEyeCheck />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Add to Watchlist">
                  <ActionIcon>
                    <IconClockHour4 />
                  </ActionIcon>
                </Tooltip>
              </Flex>
              <Text size="xl" sx={{ fontStyle: "italic" }}>
                {movie.tagline}
              </Text>
            </Stack>
          </Box>
        )}
      </Box>
      <Space h="md" />
      <Flex align="stretch" gap="md">
        <Stack>
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            bg="none"
            sx={(theme) => ({
              borderColor: theme.colors.dark[1],
            })}
          >
            <Stack>
              <Text color="white" size="xl">
                Already seen it?
              </Text>
              <Rating defaultValue={2} size="xl" />
            </Stack>
          </Card>
          <Button
            variant="light"
            radius="lg"
            rightIcon={<IconUserPlus />}
            onClick={() => setShowRecommendationModal(true)}
          >
            Recommend this movie
          </Button>
        </Stack>
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          bg="none"
          sx={(theme) => ({ borderColor: theme.colors.dark[1], flex: 1 })}
        >
          <Stack>
            <Text color="white" size="xl">
              Tell us what you thought about it
            </Text>
            <Textarea
              placeholder="Your comment"
              size="lg"
              styles={(theme) => ({
                input: {
                  border: `1px solid ${theme.colors.dark[1]}`,
                  color: "white",
                  "::placeholder": { color: theme.colors.gray[4] },
                },
              })}
            />
            <Button sx={{ alignSelf: "end" }} variant="light" radius="lg">
              Submit
            </Button>
          </Stack>
        </Card>
      </Flex>
      <Space h="xl" />
      <Title color="white" size="h3">
        What others think
      </Title>
      <Space h="xl" />
      <Stack spacing="md" px="md">
        {new Array(5).fill(undefined).map((_, idx) => (
          <Box key={idx}>
            <Group>
              <Stack sx={{ flex: 1 }}>
                <Text color="white" sx={{ wordWrap: "normal" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi labore nulla nihil eos optio iusto? Iure, deleniti
                  quibusdam iste repudiandae molestias repellendus, modi aliquam
                  vel nesciunt doloribus, facere sapiente sint!
                </Text>
                <Group>
                  <Rating value={2} readOnly />
                  <Avatar radius="xl" />
                  <Text color="white">John Doe</Text>
                </Group>
              </Stack>
            </Group>
            <Space h="sm" />
            <Divider size="sm" color={theme.colors.dark[3]} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Movie;
