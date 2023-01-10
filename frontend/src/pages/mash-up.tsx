import {
  Box,
  Center,
  Container,
  Group,
  MultiSelect,
  Space,
  Stack,
  Title,
  UnstyledButton,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { IconArmchair2, IconDeviceTv, IconMovie } from "@tabler/icons";
import { useState } from "react";
import { BiCameraMovie, BiTv, BiPlayCircle } from "react-icons/bi";

const MashUp = () => {
  const theme = useMantineTheme();

  const [mashUpType, setMashUpType] = useState<"movie" | "show">("movie");

  return (
    <Box>
      <svg
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
        focusable="false"
      >
        <linearGradient id="jellyfin-gradient" x2="1" y2="1">
          <stop offset="0%" stopColor="#9b61c5" />
          <stop offset="100%" stopColor="#119ad8" />
        </linearGradient>
      </svg>
      <Center style={{ width: "100%", minHeight: 400 }} p="lg">
        <Group spacing={60} sx={{ justifyContent: "center" }}>
          <UnstyledButton
            onClick={() => setMashUpType("movie")}
            sx={{
              ":hover": {
                "& svg": {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <Stack align="center">
              <Title
                sx={(theme) => ({
                  background:
                    mashUpType === "movie"
                      ? theme.fn.linearGradient(45, "#9b61c5", "#119ad8")
                      : "white",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                })}
              >
                Movie Night
              </Title>
              <BiCameraMovie
                fill={
                  mashUpType === "movie"
                    ? "url(#jellyfin-gradient) white"
                    : "white"
                }
                style={{
                  transition: "transform 0.25s ease-in-out",
                }}
                size={124}
              />
            </Stack>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => setMashUpType("show")}
            sx={{
              ":hover": {
                "& svg": {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <Stack align="center">
              <Title
                sx={(theme) => ({
                  background:
                    mashUpType === "show"
                      ? theme.fn.linearGradient(45, "#9b61c5", "#119ad8")
                      : "white",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                })}
              >
                Show Binge
              </Title>
              <BiTv
                fill={
                  mashUpType === "show"
                    ? "url(#jellyfin-gradient) white"
                    : "white"
                }
                style={{
                  transition: "transform 0.25s ease-in-out",
                }}
                size={124}
              />
            </Stack>
          </UnstyledButton>
        </Group>
      </Center>
      <Space h="lg" />
      <Container>
        <Stack>
          <Title color="white" order={2}>
            Who do you want to watch a {mashUpType} with?
          </Title>
          <MultiSelect
            data={["John Doe"]}
            searchable
            size="lg"
            styles={{
              dropdown: { color: "white" },
              item: { color: "white" },
              value: { color: "white" },
            }}
          />
          <Button
            variant="outline"
            color="indigo"
            rightIcon={<BiPlayCircle />}
            size="lg"
            sx={(theme) => ({
              background:
                mashUpType === "movie"
                  ? theme.fn.linearGradient(45, "#9b61c5", "#119ad8")
                  : "white",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              ":hover": {
                color: "white",
                backgroundClip: "unset",
                WebkitTextFillColor: "unset",
              },
            })}
          >
            Recommend a {mashUpType}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default MashUp;
