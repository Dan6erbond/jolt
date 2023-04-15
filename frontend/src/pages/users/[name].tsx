import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Flex,
  Group,
  Paper,
  Rating,
  Stack,
  Tabs,
  Text,
  Title,
  em,
  getBreakpointValue,
} from "@mantine/core";
import { IconEye, IconMessage2, IconStar } from "@tabler/icons";
import { useParams } from "react-router-dom";
import Poster from "../../components/media/poster";
import UserAvatar from "../../components/user/userAvatar";
import { graphql } from "../../gql";

const User = () => {
  const { name } = useParams();
  const { data } = useQuery(
    graphql(`
      query UserByName($name: String!) {
        user(name: $name) {
          id
          profileImageUrl
          name
          userFollows
          followers {
            id
          }
          reviews {
            id
            media {
              ... on Movie {
                id
                tmdbId
                title
                posterPath
                backdropPath
              }
              ... on Tv {
                id
                tmdbId
                name
                posterPath
                backdropPath
              }
            }
            createdBy {
              id
              profileImageUrl
              name
            }
            rating
            review
          }
          watched {
            ... on Movie {
              id
              tmdbId
              title
              posterPath
              backdropPath
            }
            ... on Tv {
              id
              tmdbId
              name
              posterPath
              backdropPath
            }
          }
        }
      }
    `),
    { variables: { name: name! } },
  );

  const [toggleFollow] = useMutation(
    graphql(`
      mutation ToggleFollow($userId: ID!) {
        toggleFollow(userId: $userId) {
          id
          userFollows
          followers {
            id
          }
        }
      }
    `),
  );

  return (
    <Flex
      justify="space-between"
      p="lg"
      align="start"
      wrap="wrap-reverse"
      gap="md"
    >
      <Tabs
        styles={(theme) => ({
          tab: {
            color: theme.colors.gray[4],
            "&[data-active]": { color: "white" },
          },
          root: {
            flex: 1,
            [`@media (max-width: ${em(
              getBreakpointValue(theme.breakpoints.lg),
            )})`]: {
              flex: "0 0 100%",
            },
          },
        })}
        defaultValue="reviews"
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
          <Tabs.Tab value="watched" icon={<IconEye size="0.8rem" />}>
            Watched
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="reviews">
          <Stack p="md">
            {data?.user?.reviews.map((review) => (
              <Paper key={review.id} p="md">
                <Group>
                  <Poster model={review.media} size="xs" />
                  <Stack>
                    <Title order={4} color="white">
                      {review.media.__typename === "Movie"
                        ? review.media.title
                        : review.media.__typename === "Tv"
                        ? review.media.name
                        : ""}
                    </Title>
                    <Text color="white" sx={{ wordWrap: "normal" }}>
                      {review.review}
                    </Text>
                    <Group>
                      <Rating value={review.rating} readOnly />
                      <UserAvatar radius="xl" user={review.createdBy} />
                      <Text color="white">{review.createdBy.name}</Text>
                    </Group>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="watched">
          <Flex wrap="wrap" p="md">
            {data?.user?.watched.map((media) => (
              <Poster model={media} size="md" key={media.id} />
            ))}
          </Flex>
        </Tabs.Panel>
      </Tabs>
      <Card
        bg="dark.3"
        radius="lg"
        miw={300}
        sx={(theme) => ({
          flex: 1,
          margin: "0 auto",
          [`@media (min-width: ${em(
            getBreakpointValue(theme.breakpoints.lg),
          )})`]: {
            maxWidth: "400px",
          },
        })}
      >
        <Card.Section
          sx={{ overflow: "visible" }}
          miw={{ base: 250, sm: 300, lg: 350 }}
          mih={{ base: 100, lg: 150 }}
          pos="relative"
          bg="dark.0"
        >
          {data?.user && (
            <UserAvatar
              radius="100%"
              size="xl"
              color="teal"
              pos="absolute"
              bottom={-40}
              left={25}
              user={data.user}
            />
          )}
        </Card.Section>
        <Card.Section p="md">
          <Flex justify="end">
            {data?.user?.id && (
              <Button
                variant="light"
                radius="lg"
                onClick={() =>
                  toggleFollow({ variables: { userId: data!.user!.id } })
                }
              >
                {data?.user?.userFollows ? "Following" : "Follow"}
              </Button>
            )}
          </Flex>
          <Title color="white" order={2} mb="md">
            {data?.user?.name}
          </Title>
          <Text color="gray.5">6 Reviews</Text>
          <Text color="gray.5">{data?.user?.followers.length} Followers</Text>
          <Text color="gray.5">246 Upbolts</Text>
        </Card.Section>
      </Card>
    </Flex>
  );
};

export default User;
