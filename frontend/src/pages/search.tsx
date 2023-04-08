import { Box, Flex, Space, Title } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Poster from "../components/poster";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [loadSearch, { data: searchData }] = useSearch();

  const query = searchParams.get("query");

  useEffect(() => {
    query && loadSearch({ variables: { query } });
  }, [query, loadSearch]);

  return (
    <Box>
      <Title color="white">
        Search Results for &apos;{searchParams.get("query")}&apos;
      </Title>
      <Space h="lg" />
      <Flex wrap="wrap" gap="lg">
        {searchData?.search?.results.map((item) => (
          <Poster key={item.id} model={item} size="md" />
        ))}
      </Flex>
    </Box>
  );
};

export default Search;
