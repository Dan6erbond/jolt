import { useQuery } from "@apollo/client";
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Image,
  Loader,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import RecommendationCard from "../components/recommendationCard";
import ReviewCard from "../components/reviewCard";
import { graphql } from "../gql";

const LegacyFeed = () => {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Stack spacing="xs">
        <Group spacing="xs">
          <Avatar radius="xl" />
          <Text color="white">
            <Text component="span" color={theme.colors.gray[4]}>
              John Doe
            </Text>{" "}
            is watching
          </Text>
        </Group>
        <Paper p="lg">
          <Group>
            {/* <Poster
              size="xs"
              model={{
                media_type: "movie",
                id: 76600,
                poster_path: "t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                title: "Avatar: The Way of Water",
              }}
            /> */}
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
      </Stack>
      <Divider color={theme.colors.gray[7]} />
      <Stack spacing="xs">
        <Group spacing="xs">
          <Avatar radius="xl" />
          <Text color="white">
            <Text component="span" color={theme.colors.gray[4]}>
              John Doe
            </Text>{" "}
            just reviewed
          </Text>
        </Group>
        <ReviewCard />
      </Stack>
      <Divider color={theme.colors.gray[7]} />
    </Stack>
  );
};

export default LegacyFeed;

export const Home = () => {
  const theme = useMantineTheme();

  const { data } = useQuery(
    graphql(`
      query UserFeed {
        userFeed {
          ... on Recommendation {
            id
            media {
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
            recommendedBy {
              id
              name
            }
            message
          }
        }
      }
    `),
  );

  return (
    <Box>
      <Title color="white">Your Feed</Title>
      <Space h="lg" />
      <Stack>
        {data?.userFeed.map((item, idx) => (
          <Box key={item.id}>
            <Stack spacing="xs">
              <Group spacing="xs">
                <Anchor
                  component={Link}
                  to={"/user/" + item.recommendedBy.name}
                >
                  <Group spacing="xs">
                    <Avatar radius="xl" />
                    <Text color={theme.colors.gray[4]}>
                      {item.recommendedBy.name}
                    </Text>
                  </Group>
                </Anchor>
                <Text color="white">recommended you</Text>
              </Group>
              <RecommendationCard recommendation={item} />
              {idx !== data?.userFeed.length - 1 && (
                <Divider color={theme.colors.gray[7]} />
              )}
            </Stack>
          </Box>
        ))}
        <Loader
          variant="dots"
          color="white"
          sx={{ alignSelf: "center" }}
          mt="lg"
        />
      </Stack>
    </Box>
  );
};
