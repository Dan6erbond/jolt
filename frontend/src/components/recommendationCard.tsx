import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconBolt, IconCircleChevronRight } from "@tabler/icons";
import { Link } from "react-router-dom";
import Poster from "../components/poster";

const RecommendationCard = () => {
  const theme = useMantineTheme();

  return (
    <Paper
      component={Link}
      to={`/movies/${76600}`}
      p="lg"
      sx={{ ":hover": { backgroundColor: theme.colors.dark[6] } }}
    >
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
            <Group spacing="xs">
              <Avatar radius="xl" />
              <Text color={theme.colors.gray[4]}>John Doe</Text>
            </Group>
            <Paper p="sm" radius="lg" bg={theme.colors.dark[5]}>
              <Text color="white">You really gotta watch this!</Text>
            </Paper>
            <ActionIcon
              variant="subtle"
              radius="xl"
              color="gray"
              onClick={(e) => e.preventDefault()}
            >
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
  );
};

export default RecommendationCard;
