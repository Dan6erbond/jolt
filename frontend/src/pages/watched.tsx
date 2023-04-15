import { useQuery } from "@apollo/client";
import { Box, Group, Space, Stack, Title } from "@mantine/core";
import { TbEyeCheck } from "react-icons/tb";
import MediaCard from "../components/media/mediaCard";
import { graphql } from "../gql";

const Watched = () => {
  const { data } = useQuery(
    graphql(`
      query Watched {
        me {
          id
          watched {
            __typename
            ... on Movie {
              id
              tmdbId
              jellyfinUrl
              title
              overview
              releaseDate
              posterPath
              genres
              watched
              addedToWatchlist
              userReview {
                rating
                review
              }
            }
            ... on Tv {
              id
              tmdbId
              name
              overview
              firstAirDate
              posterPath
              genres
              watched
              addedToWatchlist
              userReview {
                rating
                review
              }
            }
          }
        }
      }
    `),
  );

  return (
    <Box>
      <Group>
        <TbEyeCheck color="white" size={52} />
        <Title color="white">Watched</Title>
      </Group>
      <Space h="lg" />
      <Stack>
        {data?.me.watched.map((media) => (
          <MediaCard
            media={media}
            key={media.id}
            showToggleWatched
            showAddReview={media.userReview === null}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Watched;
