import { TbUserPlus } from "react-icons/tb";
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
import RecommendationCard from "../components/recommendationCard";
const Recommendations = () => {
  return (
    <Box>
      <Group>
        <TbUserPlus color="white" size={52} />
        <Title color="white">Recommendations</Title>
      </Group>
      <Space h="lg" />
      <Stack>
        {new Array(10).fill(undefined).map((idx) => (
          <RecommendationCard key={idx} />
        ))}
      </Stack>
    </Box>
  );
};

export default Recommendations;
