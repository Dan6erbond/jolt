import { Box, Flex, Space, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import Poster from "../components/poster";
import { useTmdbClient } from "../tmdb/context";

const Search = () => {
  const tmdbClient = useTmdbClient();
  const [searchParams] = useSearchParams();
  const { data } = useSWR(
    ["tmdbMultiSearch", searchParams.get("query")],
    async ([_, search]) =>
      search ? await tmdbClient.multiSearch({ query: search }) : null,
  );

  return (
    <Box>
      <Title color="white">
        Search Results for &apos;{searchParams.get("query")}&apos;
      </Title>
      <Space h="lg" />
      <Flex wrap="wrap" gap="lg">
        {data?.results.map((item) => (
          <Poster key={item.id} model={item} size="md" />
        ))}
      </Flex>
    </Box>
  );
};

export default Search;
