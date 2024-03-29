import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Modal,
  Rating,
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
  IconClockHour4,
  IconEyeCheck,
  IconMessage2,
  IconSend,
  IconStar,
  IconUserPlus,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import Poster from "../../components/media/poster";
import ReviewCard from "../../components/media/reviewCard";
import UserSelect from "../../components/user/userSelect";
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
            rating
            createdBy {
              id
              profileImageUrl
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
    { variables: { tmdbId: tvId! } },
  );

  const { data: usersData } = useQuery(
    graphql(`
      query Users {
        users {
          id
          profileImageUrl
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

  const [reviewTv, { loading: submittingReview }] = useMutation(
    graphql(`
      mutation ReviewTv($tmdbId: ID!, $review: String!) {
        reviewTv(tmdbId: $tmdbId, review: $review) {
          media {
            ... on Tv {
              id
              reviews {
                review
                createdBy {
                  id
                  profileImageUrl
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
    reviewTv({
      variables: { tmdbId: tvId!, review: review },
    });
  };

  const submitRecommendation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    client.mutate({
      mutation: graphql(`
        mutation RecommendTv($tmdbId: ID!, $userId: ID!, $message: String!) {
          createRecommendation(
            input: {
              tmdbId: $tmdbId
              mediaType: TV
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
          mutation AddTVToWatchlist($tmdbId: ID!) {
            addToWatchlist(input: { mediaType: TV, tmdbId: $tmdbId }) {
              ... on Tv {
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
          mutation RemoveTVFromWatchlist($tmdbId: ID!) {
            removeFromWatchlist(input: { mediaType: TV, tmdbId: $tmdbId }) {
              ... on Tv {
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

  const toggleWatched = () => {
    client.mutate({
      mutation: graphql(`
        mutation ToggleTVWatched($tmdbId: ID!) {
          toggleWatched(input: { mediaType: TV, tmdbId: $tmdbId }) {
            __typename
            ... on Tv {
              id
              watched
            }
          }
        }
      `),
      variables: { tmdbId: tvId! },
    });
  };

  if (!data?.tv) {
    return <></>;
  }

  return (
    <Box>
      <Modal
        opened={showRecommendationModal}
        onClose={() => setShowRecommendationModal((show) => !show)}
        title="Recommend show"
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
              <UserSelect
                users={
                  usersData?.users.filter(
                    (user) => user.id !== myIdData?.me.id,
                  ) || []
                }
                value={recommendUserId}
                onChange={setRecommendUserId}
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
      <Box style={{ position: "relative", zIndex: 0 }} mih="250px">
        <Image
          src={
            data?.tv &&
            `https://image.tmdb.org/t/p/original${data?.tv.backdropPath}`
          }
          styles={{
            root: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -10,
            },
            figure: { height: "100%" },
            imageWrapper: { height: "100%" },
            image: {
              objectPosition: "center top",
            },
          }}
          height="100%"
          fit="cover"
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
            zIndex: -10,
          }}
        />
        {data?.tv && (
          <Box>
            <Stack p="md" spacing="sm">
              <Flex align="end" gap="md" wrap="wrap">
                <Poster model={data?.tv} size="sm" />
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
                      <ActionIcon onClick={toggleWatched}>
                        <IconEyeCheck
                          color={
                            data.tv.watched ? theme.colors.yellow[6] : "white"
                          }
                        />
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
                mutation RateTv($tmdbId: ID!, $rating: Float!) {
                  rateTv(tmdbId: $tmdbId, rating: $rating) {
                    media {
                      ... on Tv {
                        id
                        rating
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
          Recommend this show
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
              {data?.tv.reviews
                .filter((review) => review.createdBy.id !== myIdData?.me.id)
                .map((review) => (
                  <ReviewCard key={review.id} review={review} />
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

export default Tv;
