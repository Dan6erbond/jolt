import { useApolloClient } from "@apollo/client";
import {
  Button,
  Card,
  Center,
  Input,
  PasswordInput,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TbKey, TbUser } from "react-icons/tb";
import { Form, Link, useNavigate } from "react-router-dom";
import { graphql } from "../gql";
import { accessToken, loggedIn } from "../utils/apolloClient";

const Login = () => {
  const theme = useMantineTheme();
  const client = useApolloClient();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { username: "", password: "" },
  });

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { data, errors } = await client.mutate({
      mutation: graphql(`
        mutation Login($input: SignInWithJellyfinInput!) {
          signInWithJellyfin(input: $input) {
            accessToken
            refreshToken
          }
        }
      `),
      variables: { input: { username, password } },
    });
    if (errors) {
    } else if (data) {
      loggedIn(true);
      accessToken(data.signInWithJellyfin.accessToken);
      localStorage.setItem(
        "refreshToken",
        data.signInWithJellyfin.refreshToken,
      );
      navigate("/");
    }
  };

  return (
    <Center sx={{ height: "100vh", flexDirection: "column", gap: "24px" }}>
      <Text
        component={Link}
        to="/"
        transform="uppercase"
        color="white"
        sx={{ alignSelf: "center", fontFamily: "Righteous" }}
        size={64}
      >
        <span>Jo</span>
        <svg
          width="48"
          height="48"
          viewBox="0 0 34 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
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
              <stop stopColor="#A15BBC" />
              <stop offset="1" stopColor="#1E97D7" />
            </linearGradient>
          </defs>
        </svg>
        <span>t</span>
      </Text>
      <Card
        sx={(theme) => ({
          background: theme.fn.rgba(theme.colors.dark[4], 0.7),
          backdropFilter: "flur(8px)",
        })}
        radius="lg"
        miw={400}
      >
        <Card.Section p="xl">
          <Stack>
            <Text color={theme.colors.indigo[8]} size="sm" align="center">
              Sign in with Jellyfin
            </Text>
            <Form onSubmit={form.onSubmit(login)}>
              <Stack spacing="xl">
                <Input.Wrapper
                  label="Username"
                  size="lg"
                  styles={(theme) => ({
                    label: {
                      color: theme.colors.gray[3],
                      marginBottom: "0.5rem",
                    },
                  })}
                >
                  <Input
                    placeholder="Jellyfin Username"
                    size="lg"
                    radius="lg"
                    icon={<TbUser />}
                    styles={(theme) => ({
                      icon: { color: theme.colors.gray[5] },
                      input: {
                        "::placeholder": { color: theme.colors.gray[7] },
                        color: theme.colors.gray[3],
                      },
                    })}
                    {...form.getInputProps("username")}
                  />
                </Input.Wrapper>
                <PasswordInput
                  label="Password"
                  size="lg"
                  radius="lg"
                  icon={<TbKey />}
                  placeholder="Jellyfin Password"
                  styles={(theme) => ({
                    label: {
                      color: theme.colors.gray[3],
                      marginBottom: "0.5rem",
                    },
                    icon: { color: theme.colors.gray[5] },
                    innerInput: {
                      "::placeholder": { color: theme.colors.gray[7] },
                      color: theme.colors.gray[3],
                    },
                  })}
                  {...form.getInputProps("password")}
                />
                <Button
                  variant="gradient"
                  size="md"
                  radius="xl"
                  bg={theme.fn.linearGradient(45, "#A15BBC", "#1E97D7")}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Card.Section>
      </Card>
    </Center>
  );
};

export default Login;
