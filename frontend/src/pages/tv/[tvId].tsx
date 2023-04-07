import { useApolloClient, useMutation, useQuery } from "@apollo/client";
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

const Tv = () => {
  const { tvId } = useParams();
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
      query Tv($tmdbId: ID!) {
        tv(tmdbId: $tmdbId) {
          id
          tmdbId
          name
          tagline
          posterPath
          backdropPath
          genres
          firstAirDate
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
        }
      }
    `),
    { variables: { tmdbId: tvId! } },
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

  const userRating = data?.tv?.userReview?.rating;

  useEffect(() => {
    userRating && setRating(userRating);
  }, [userRating, setRating]);

  const userReview = data?.tv?.userReview?.review;

  useEffect(() => {
    userReview && setReview(userReview);
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
      variables: { tmdbId: tvId!, review: review },
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
        tmdbId: tvId!,
        userId: recommendUserId!,
      },
    });
  };

  const toggleWatchlist = () => {
    if (!data?.tv?.addedToWatchlist) {
      client.mutate({
        mutation: graphql(`
          mutation AddToWatchlist($tmdbId: ID!) {
            addToWatchlist(input: { mediaType: MOVIE, tmdbId: $tmdbId }) {
              ... on Movie {
                id
                addedToWatchlist
              }
            }
          }
        `),
        variables: { tmdbId: tvId! },
      });
    } else {
      client.mutate({
        mutation: graphql(`
          mutation RemoveFromWatchlist($tmdbId: ID!) {
            removeFromWatchlist(input: { mediaType: MOVIE, tmdbId: $tmdbId }) {
              ... on Movie {
                id
                addedToWatchlist
              }
            }
          }
        `),
        variables: { tmdbId: tvId! },
      });
    }
  };

  if (!data?.tv) {
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
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.65}
        overlayBlur={3}
        size="lg"
      >
        <Stack>
          <Flex gap="md">
            <Poster model={data?.tv} size="sm" />
            <Stack spacing="xs" sx={{ flexGrow: 1 }}>
              <Title color="white" size="h3" sx={{ wordWrap: "break-word" }}>
                {data?.tv.name}{" "}
                <Text component="span" size="xl">
                  ({data?.tv.firstAirDate.substring(0, 4)})
                </Text>
              </Title>
              <Group spacing="xs">
                <Text color={theme.colors.gray[4]}>
                  {data?.tv.genres.join(", ")}
                </Text>
              </Group>
              <Rating value={data?.tv.rating} readOnly />
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
      <Box style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={
            data?.tv &&
            `https://image.tmdb.org/t/p/original${data?.tv.backdropPath}`
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
        {data?.tv && (
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
                  src={`https://image.tmdb.org/t/p/original${data?.tv.posterPath}`}
                  height={200}
                  width={2000 * (200 / 3000)}
                  alt={data?.tv.name}
                  withPlaceholder
                  placeholder={
                    <Skeleton height={300} width={2000 * (300 / 3000)} />
                  }
                  styles={{ image: { borderRadius: "10px" } }}
                />
                <Stack spacing="xs">
                  <Title color="white">
                    {data?.tv.name}{" "}
                    <Text component="span" size="xl">
                      ({data?.tv.firstAirDate.substring(0, 4)})
                    </Text>
                  </Title>
                  <Group spacing="xs">
                    <Text color="white">{data?.tv.genres.join(", ")}</Text>
                  </Group>
                </Stack>
                <Box style={{ flexGrow: 1 }} />
                <Stack>
                  <Rating value={data?.tv.rating} readOnly size="sm" />
                  <Flex justify="end" gap="sm">
                    <Tooltip label="Watched">
                      <ActionIcon>
                        <IconEyeCheck />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Add to Watchlist">
                      <ActionIcon onClick={toggleWatchlist}>
                        <IconClockHour4
                          color={
                            data.tv.addedToWatchlist
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
                {data?.tv.tagline}
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
                        userReview {
                          id
                          rating
                          review
                        }
                      }
                    }
                  }
                }
              `),
              variables: {
                tmdbId: tvId!,
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
          tabLabel: {
            ":not": {
              "[data-active]": { color: theme.colors.gray[4] },
            },
            "[data-active]": { color: "white" },
          },
          tabIcon: {
            ":not": {
              "[data-active]": { color: theme.colors.gray[4] },
            },
            "[data-active]": { color: "white" },
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
          <Stack spacing="md" px="md">
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
            {data?.tv.reviews
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
        </Tabs.Panel>
        <Tabs.Panel value="comments" pt="xs">
          <Text>I&apos;m not implemented yet</Text>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default Tv;