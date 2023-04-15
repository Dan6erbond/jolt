import {
  Box,
  Divider,
  Group,
  Rating,
  Space,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import UserAvatar from "../user/userAvatar";

interface ReviewCardProps {
  review: {
    __typename?: "Review";
    id: string;
    review: string;
    rating: number;
    createdBy: {
      __typename?: "User";
      id?: string;
      name?: string;
      profileImageUrl?: string;
    };
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const theme = useMantineTheme();

  return (
    <Box key={review.id}>
      <Group>
        <Stack sx={{ flex: 1 }}>
          <Text color="white" sx={{ wordWrap: "normal" }}>
            {review.review}
          </Text>
          <Group>
            <Rating value={review.rating} readOnly />
            <UserAvatar radius="xl" user={review.createdBy} />
            <Text color="white">{review.createdBy.name}</Text>
          </Group>
        </Stack>
      </Group>
      <Space h="sm" />
      <Divider size="sm" color={theme.colors.dark[3]} />
    </Box>
  );
};

export default ReviewCard;
