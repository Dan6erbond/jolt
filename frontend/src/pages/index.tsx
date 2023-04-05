import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Poster from "../components/poster";
import RecommendationCard from "../components/recommendationCard";
import ReviewCard from "../components/reviewCard";

export const Home = () => {
  const theme = useMantineTheme();

  return (
    <Box>
      <Title color="white">Your Feed</Title>
      <Space h="lg" />
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
              <Poster
                size="xs"
                model={{
                  media_type: "movie",
                  id: 76600,
                  poster_path: "t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                  title: "Avatar: The Way of Water",
                }}
              />
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
        <Stack spacing="xs">
          <Group spacing="xs">
            <Avatar radius="xl" />
            <Text color="white">
              <Text component="span" color={theme.colors.gray[4]}>
                John Doe
              </Text>{" "}
              recommended you
            </Text>
          </Group>
          <RecommendationCard
            recommendation={{
              id: "1",
              media: { __typename: "Movie", id: "1", tmdbId: "76600" },
              message: "It's great!",
              recommendedBy: { id: "1", name: "John Doe", __typename: "User" },
            }}
          />
        </Stack>
        <Divider color={theme.colors.gray[7]} />
      </Stack>
    </Box>
  );
};
