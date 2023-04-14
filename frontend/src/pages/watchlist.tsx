import { useQuery } from "@apollo/client";
import { Box, Group, Space, Stack, Title } from "@mantine/core";
import { AiOutlineFieldTime } from "react-icons/ai";
import { graphql } from "../gql";
import MediaCard from "../components/mediaCard";

const Watchlist = () => {
  const { data } = useQuery(
    graphql(`
      query Watchlist {
        me {
          id
          watchlist {
            __typename
            ... on Movie {
              id
              tmdbId
              jellyfinUrl
              title
              overview
              tagline
              releaseDate
              posterPath
              genres
              watched
              addedToWatchlist
            }
            ... on Tv {
              id
              tmdbId
              name
              overview
              tagline
              firstAirDate
              posterPath
              genres
              watched
              addedToWatchlist
            }
          }
        }
      }
    `),
  );

  return (
    <Box>
      <Group>
        <AiOutlineFieldTime color="white" size={52} />
        <Title color="white">Watchlist</Title>
      </Group>
      <Space h="lg" />
      <Stack>
        {data?.me.watchlist.map((media) => (
          <MediaCard media={media} key={media.id} showToggleWatched />
        ))}
      </Stack>
    </Box>
  );
};

export default Watchlist;
