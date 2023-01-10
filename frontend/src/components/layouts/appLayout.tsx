import {
  AppShell,
  Autocomplete,
  Avatar,
  Button,
  Group,
  Menu,
  Navbar,
  SelectItemProps,
  Space,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import {
  TbHome,
  TbMovie,
  TbPlanet,
  TbSearch,
  TbUser,
  TbUserPlus,
} from "react-icons/tb";
import { Form, Link, Outlet } from "react-router-dom";
import { useTmdbClient } from "../../tmdb/context";
import { Movie } from "../../tmdb/types/movie";
import { SearchResultItem } from "../../tmdb/types/multiSearch";
import { Person } from "../../tmdb/types/person";
import { Tv } from "../../tmdb/types/tv";
import { isMovie } from "../../tmdb/utils/isMovie";

export type SearchResultItemProps =
  | (Tv & Omit<SelectItemProps, "id">)
  | (Movie & Omit<SelectItemProps, "id">)
  | (Person & Omit<SelectItemProps, "id">);

const AppLayout = () => {
  const theme = useMantineTheme();
  const tmdbClient = useTmdbClient();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Array<SearchResultItem> | undefined>();

  const [debouncedSearch] = useDebouncedValue(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      (async () => {
        const { results } = await tmdbClient.multiSearch({
          query: debouncedSearch,
        });
        setResults(results);
      })();
    }
  }, [debouncedSearch, setResults, tmdbClient]);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          sx={(theme) => ({
            background: theme.fn.gradient({
              from: theme.colors.dark[4],
              to: theme.colors.dark[6],
              deg: 45,
            }),
            borderRight: `1px solid ${theme.colors.dark[3]}`,
          })}
        >
          <Stack align="stretch" py="sm">
            <Text
              component={Link}
              to="/"
              transform="uppercase"
              color="white"
              sx={{ alignSelf: "center", fontFamily: "Righteous" }}
              size={42}
            >
              <span>Jo</span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 34 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 0L16.7054 19.7579H34L15 46L18.5057 27.8324H0L22 0Z"
                  fill="url(#paint0_linear_6_10)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6_10"
                    x1="8.5"
                    y1="17"
                    x2="17"
                    y2="46"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#A15BBC" />
                    <stop offset="1" stop-color="#1E97D7" />
                  </linearGradient>
                </defs>
              </svg>
              <span>t</span>
            </Text>
            <Button
              component={Link}
              to="/"
              leftIcon={<TbHome />}
              variant="subtle"
              color="gray"
              size="lg"
              sx={{ display: "flex", justifyContent: "stretch" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/discover"
              leftIcon={<TbPlanet color="white" size={24} />}
              variant="subtle"
              color="gray"
              size="lg"
              sx={{ display: "flex", justifyContent: "stretch" }}
            >
              Discover
            </Button>
            <Button
              component={Link}
              to="/recommendations"
              leftIcon={<TbUserPlus color="white" size={24} />}
              variant="subtle"
              color="gray"
              size="lg"
              sx={{ display: "flex", justifyContent: "stretch" }}
            >
              Recommendations
            </Button>
            <Button
              component={Link}
              to="/mash-up"
              leftIcon={<TbMovie color="white" size={24} />}
              variant="subtle"
              color="gray"
              size="lg"
              sx={{ display: "flex", justifyContent: "stretch" }}
            >
              Mash-Up
            </Button>
            <Button
              component={Link}
              to="/watchlist"
              leftIcon={<AiOutlineFieldTime color="white" size={24} />}
              variant="subtle"
              color="gray"
              size="lg"
              sx={{ display: "flex", justifyContent: "stretch" }}
            >
              Watchlist
            </Button>
          </Stack>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          background: theme.fn.gradient({
            from: theme.colors.dark[4],
            to: theme.colors.dark[6],
            deg: -45,
          }),
        },
      })}
    >
      <Group align="center">
        <Form method="get" action="/search" style={{ flexGrow: 1 }}>
          <Autocomplete
            data={
              results?.map((item) =>
                isMovie(item) ? item.title : item.name
              ) || []
            }
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Search Jolt"
            radius="xl"
            size="lg"
            styles={(theme) => ({
              input: {
                border: `1px solid ${theme.colors.dark[1]}`,
                color: "white",
                "::placeholder": { color: theme.colors.gray[4] },
              },
            })}
            icon={<TbSearch color={theme.colors.gray[6]} size={16} />}
            name="query"
          />
        </Form>
        <Menu position="bottom-end">
          <Menu.Target>
            <UnstyledButton
              sx={(theme) => ({
                borderRadius: "100%",
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Avatar color="cyan" radius="xl" size="lg">
                MK
              </Avatar>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown
            bg={theme.fn.rgba(theme.colors.dark[6], 0.5)}
            sx={{ backdropFilter: "blur(10px)" }}
          >
            <Menu.Item color="white" icon={<TbUser size={18} />}>
              <Text size="lg">Profile</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Space h="md" />
      <Outlet />
    </AppShell>
  );
};

export default AppLayout;
