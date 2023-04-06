import { useQuery } from "@apollo/client";
import { Box, Group, Space, Stack, Title } from "@mantine/core";
import { TbUserPlus } from "react-icons/tb";
import RecommendationCard from "../components/recommendationCard";
import { graphql } from "../gql";
const Recommendations = () => {
  const { data } = useQuery(
    graphql(`
      query Recommendations {
        me {
          id
          recommendations {
            id
            media {
              __typename
              ... on Movie {
                id
                tmdbId
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
      <Group>
        <TbUserPlus color="white" size={52} />
        <Title color="white">Recommendations</Title>
      </Group>
      <Space h="lg" />
      <Stack>
        {data?.me.recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Recommendations;
