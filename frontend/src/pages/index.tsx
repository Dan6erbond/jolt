import {
  ActionIcon,
  Avatar,
  Blockquote,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Paper,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconBolt, IconCircleChevronRight } from "@tabler/icons";
import { Link } from "react-router-dom";
import Poster from "../components/poster";
import RecommendationCard from "../components/recommendationCard";

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
                <Group>
                  <Blockquote
                    cite="– John Doe"
                    styles={(theme) => ({
                      body: { color: theme.colors.gray[3] },
                      cite: { color: theme.colors.gray[6] },
                    })}
                  >
                    It was absolutely amazing and the CGI was great!
                  </Blockquote>
                  <ActionIcon variant="subtle" radius="xl" color="gray">
                    <IconBolt />
                  </ActionIcon>
                </Group>
                <Box h="auto" />
                <Group align="end" sx={{ alignSelf: "end" }}>
                  <ActionIcon
                    variant="subtle"
                    radius="xl"
                    color="blue"
                    component={Link}
                    to="/movies/76600"
                  >
                    <IconCircleChevronRight />
                  </ActionIcon>
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
              recommended you
            </Text>
          </Group>
          <RecommendationCard />
        </Stack>
        <Divider color={theme.colors.gray[7]} />
      </Stack>
    </Box>
  );
};
