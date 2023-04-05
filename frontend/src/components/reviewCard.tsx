import {
  ActionIcon,
  Blockquote,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBolt, IconCircleChevronRight } from "@tabler/icons";
import { Link } from "react-router-dom";
import Poster from "./poster";

const ReviewCard = () => {
  return (
    <Paper
      p="lg"
      component={Link}
      to={`/movies/${76600}`}
      sx={(theme) => ({ ":hover": { backgroundColor: theme.colors.dark[6] } })}
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
          asLink={false}
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
          <Text sx={(theme) => ({ color: theme.colors.gray[4] })}>
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
            <ActionIcon variant="subtle" radius="xl" color="blue">
              <IconCircleChevronRight />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default ReviewCard;
