import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  ActionIcon,
  Avatar,
  Badge,
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
  Tabs,
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
  IconMessage2,
  IconSend,
  IconStar,
  IconUserPlus,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import Poster from "../../components/poster";
import { UserSelectItem } from "../../components/userSelectItem";
import { graphql } from "../../gql";

const Movie = () => {
  const { movieId } = useParams();
  const theme = useMantineTheme();
  const client = useApolloClient();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [recommendUserId, setRecommendUserId] = useState<string | null>(null);
  const [recommendationMessage, setRecommendationMessage] = useState("");

  const { data: myIdData } = useQuery(
    graphql(`
      query MyId {
        me {
          id
        }
      }
    `),
  );

  const { data } = useQuery(
    graphql(`
      query Movie($tmdbId: ID!) {
        movie(tmdbId: $tmdbId) {
          id
          tmdbId
          title
          tagline
          posterPath
          backdropPath
          certification
          genres
          releaseDate
          rating
          reviews {
            id
            review
            createdBy {
              id
              name
            }
          }
          userReview {
            id
            rating
            review
          }
          addedToWatchlist
          watched
        }
      }
    `),
    { variables: { tmdbId: movieId! } },
  );

  const { data: usersData } = useQuery(
    graphql(`
      query Users {
        users {
          id
          name
        }
      }
    `),
  );

  const userRating = data?.movie?.userReview?.rating || 0;

  useEffect(() => {
    setRating(userRating);
  }, [userRating, setRating]);

  const userReview = data?.movie?.userReview?.review || "";

  useEffect(() => {
    setReview(userReview);
  }, [userReview, setReview]);

  const [showRecommendationModal, setShowRecommendationModal] =
    useState<boolean>(false);

  const [reviewMovie, { loading: submittingReview }] = useMutation(
    graphql(`
      mutation ReviewMovie($tmdbId: ID!, $review: String!) {
        reviewMovie(tmdbId: $tmdbId, review: $review) {
          media {
            ... on Movie {
              id
              reviews {
                review
                createdBy {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `),
  );

  const submitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reviewMovie({
      variables: { tmdbId: movieId!, review: review },
    });
  };

  const submitRecommendation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.mutate({
      mutation: graphql(`
        mutation RecommendMovie($tmdbId: ID!, $userId: ID!, $message: String!) {
          createRecommendation(
            input: {
              tmdbId: $tmdbId
              mediaType: MOVIE
              recommendationForUserId: $userId
              message: $message
            }
          ) {
            id
          }
        }
      `),
      variables: {
        message: recommendationMessage,
        tmdbId: movieId!,
        userId: recommendUserId!,
      },
    });
  };

  const toggleWatchlist = () => {
    if (!data?.movie?.addedToWatchlist) {
      client.mutate({
        mutation: graphql(`
          mutation AddMovieToWatchlist($tmdbId: ID!) {
            addToWatchlist(input: { mediaType: MOVIE, tmdbId: $tmdbId }) {
              ... on Movie {
                id
                addedToWatchlist
              }
            }
          }
        `),
        variables: { tmdbId: movieId! },
      });
    } else {
      client.mutate({
        mutation: graphql(`
          mutation RemoveMovieFromWatchlist($tmdbId: ID!) {
            removeFromWatchlist(input: { mediaType: MOVIE, tmdbId: $tmdbId }) {
              ... on Movie {
                id
                addedToWatchlist
              }
            }
          }
        `),
        variables: { tmdbId: movieId! },
      });
    }
  };

  const toggleWatched = () => {
    client.mutate({
      mutation: graphql(`
        mutation ToggleMovieWatched($tmdbId: ID!) {
          toggleWatched(input: { mediaType: MOVIE, tmdbId: $tmdbId }) {
            __typename
            ... on Movie {
              id
              watched
            }
          }
        }
      `),
      variables: { tmdbId: movieId! },
    });
  };

  if (!data?.movie) {
    return <></>;
  }

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
              theme.fn.rgba(theme.colors.dark[6], 0.7),
            ),
            backdropFilter: "blur(10px)",
          },
        })}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.65,
          blur: 3,
        }}
        size="lg"
      >
        <Stack>
          <Flex gap="md">
            <Poster model={data?.movie} size="sm" />
            <Stack spacing="xs" sx={{ flexGrow: 1 }}>
              <Title color="white" size="h3" sx={{ wordWrap: "break-word" }}>
                {data?.movie.title}{" "}
                <Text component="span" size="xl">
                  ({data?.movie.releaseDate.substring(0, 4)})
                </Text>
              </Title>
              <Group spacing="xs">
                {data?.movie.certification && (
                  <>
                    <Badge color="indigo" size="md" variant="outline">
                      {data?.movie.certification}
                    </Badge>
                    <Divider
                      orientation="vertical"
                      color={theme.colors.dark[0]}
                    />
                  </>
                )}
                <Text color={theme.colors.gray[4]}>
                  {data?.movie.genres.join(", ")}
                </Text>
              </Group>
              <Rating value={data?.movie.rating} readOnly />
            </Stack>
          </Flex>
          <Form onSubmit={submitRecommendation}>
            <Stack>
              <Select
                data={
                  usersData?.users
                    .filter((user) => user.id !== myIdData?.me.id)
                    .map((user) => ({
                      ...user,
                      value: user.id,
                      label: user.name,
                    })) || []
                }
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
                value={recommendUserId}
                onChange={setRecommendUserId}
                itemComponent={UserSelectItem}
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
                value={recommendationMessage}
                onChange={(e) => setRecommendationMessage(e.target.value)}
              />
              <Button
                sx={{ alignSelf: "end" }}
                variant="light"
                radius="lg"
                rightIcon={<IconSend />}
                type="submit"
              >
                Recommend
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Modal>
      <Box style={{ position: "relative", overflow: "hidden" }} mih="250px">
        <Image
          src={
            data?.movie &&
            `https://image.tmdb.org/t/p/original${data?.movie.backdropPath}`
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
        {data?.movie && (
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
                  src={`https://image.tmdb.org/t/p/original${data?.movie.posterPath}`}
                  height={200}
                  width={2000 * (200 / 3000)}
                  alt={data?.movie.title}
                  withPlaceholder
                  placeholder={
                    <Skeleton height={300} width={2000 * (300 / 3000)} />
                  }
                  styles={{ image: { borderRadius: "10px" } }}
                />
                <Stack spacing="xs">
                  <Title color="white">
                    {data?.movie.title}{" "}
                    <Text component="span" size="xl">
                      ({data?.movie.releaseDate.substring(0, 4)})
                    </Text>
                  </Title>
                  <Group spacing="xs">
                    {data?.movie.certification && (
                      <>
                        <Badge color="indigo" size="lg" variant="outline">
                          {data?.movie.certification}
                        </Badge>
                        <Divider
                          orientation="vertical"
                          color={theme.colors.dark[0]}
                        />
                      </>
                    )}
                    <Text color="white">{data?.movie.genres.join(", ")}</Text>
                  </Group>
                </Stack>
                <Box style={{ flexGrow: 1 }} />
                <Stack>
                  <Rating value={data?.movie.rating} readOnly size="sm" />
                  <Flex justify="end" gap="sm">
                    <Tooltip label="Watched">
                      <ActionIcon onClick={toggleWatched}>
                        <IconEyeCheck
                          color={
                            data.movie.watched
                              ? theme.colors.yellow[6]
                              : "white"
                          }
                        />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Add to Watchlist">
                      <ActionIcon onClick={toggleWatchlist}>
                        <IconClockHour4
                          color={
                            data.movie.addedToWatchlist
                              ? theme.colors.yellow[6]
                              : "white"
                          }
                        />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                </Stack>
              </Flex>
              <Text size="xl" sx={{ fontStyle: "italic" }}>
                {data?.movie.tagline}
              </Text>
            </Stack>
          </Box>
        )}
      </Box>
      <Space h="md" />
      <Group>
        <Rating
          value={rating}
          onChange={(value) => {
            setRating(value);
            client.mutate({
              mutation: graphql(`
                mutation RateMovie($tmdbId: ID!, $rating: Float!) {
                  rateMovie(tmdbId: $tmdbId, rating: $rating) {
                    media {
                      ... on Movie {
                        id
                        rating
                      }
                    }
                  }
                }
              `),
              variables: {
                tmdbId: movieId!,
                rating: value,
              },
            });
          }}
        />
        <Button
          variant="light"
          radius="lg"
          rightIcon={<IconUserPlus />}
          onClick={() => setShowRecommendationModal(true)}
        >
          Recommend this movie
        </Button>
      </Group>
      <Space h="xl" />
      <Tabs
        defaultValue="reviews"
        styles={(theme) => ({
          tab: {
            color: theme.colors.gray[4],
            "&[data-active]": { color: "white" },
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab value="reviews" icon={<IconStar size="0.8rem" />}>
            Reviews
          </Tabs.Tab>
          <Tabs.Tab
            value="comments"
            icon={<IconMessage2 size="0.8rem" />}
            disabled
          >
            Comments
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="reviews" pt="lg">
          <Stack spacing="xl" px="md">
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              bg="none"
              sx={(theme) => ({ borderColor: theme.colors.dark[1], flex: 1 })}
            >
              <Form onSubmit={submitReview}>
                <Stack>
                  <Title color="white" order={3}>
                    Your Review
                  </Title>
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
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <Button
                    sx={{ alignSelf: "end" }}
                    variant="light"
                    radius="lg"
                    type="submit"
                    loading={submittingReview}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Card>
            <Stack spacing="md">
              {data?.movie.reviews
                .filter((review) => review.createdBy.id !== myIdData?.me.id)
                .map((review) => (
                  <Box key={review.id}>
                    <Group>
                      <Stack sx={{ flex: 1 }}>
                        <Text color="white" sx={{ wordWrap: "normal" }}>
                          {review.review}
                        </Text>
                        <Group>
                          <Rating value={2} readOnly />
                          <Avatar radius="xl">
                            {review.createdBy.name
                              .split(" ")
                              .map((name) => name[0].toUpperCase())
                              .join("")}
                          </Avatar>
                          <Text color="white">{review.createdBy.name}</Text>
                        </Group>
                      </Stack>
                    </Group>
                    <Space h="sm" />
                    <Divider size="sm" color={theme.colors.dark[3]} />
                  </Box>
                ))}
            </Stack>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="comments" pt="xs">
          <Text>I&apos;m not implemented yet</Text>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Movie;
