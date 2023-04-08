import {
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Poster from "../components/poster";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const theme = useMantineTheme();

  const [searchParams] = useSearchParams();
  const [loadSearch, { data: searchData }] = useSearch();

  const query = searchParams.get("query");

  useEffect(() => {
    query && loadSearch({ variables: { query } });
  }, [query, loadSearch]);

  return (
    <Stack spacing="lg">
      <Stack>
        <Title color="white" order={2}>
          Profiles
        </Title>
        <Stack>
          {searchData?.search.profiles.map((profile) => (
            <Card
              key={profile.id}
              component={Link}
              to={"/users/" + profile.id}
              sx={(theme) => ({
                background: theme.colors.dark[4],
                ":hover": { background: theme.colors.dark[3] },
              })}
            >
              <Group>
                <Avatar radius="xl">
                  {profile.name
                    .split(" ")
                    .map((name) => name[0].toUpperCase())
                    .join("")}
                </Avatar>
                <Text color="white">{profile.name}</Text>
                <Box sx={{ flex: 1 }} />
                <IconCircleChevronRight color={theme.colors.blue[2]} />
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Title color="white" order={2}>
          TMDB Results for &apos;{searchParams.get("query")}&apos;
        </Title>
        <Flex wrap="wrap" gap="lg" mb="xl">
          {searchData?.search?.tmdb.results.map((item) => (
            <Poster key={item.id} model={item} size="md" />
          ))}
        </Flex>
        <Flex justify="center">
          <Loader variant="dots" color="white" />
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Search;
