import { ApolloProvider } from "@apollo/client";
import "@fontsource/nunito";
import "@fontsource/righteous";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layouts/appLayout";
import { Home } from "./pages";
import Discover from "./pages/discover";
import Login from "./pages/login";
import MashUp from "./pages/mash-up";
import Movie from "./pages/movies/[movieId]";
import Recommendations from "./pages/recommendations";
import Search from "./pages/search";
import Tv from "./pages/tv/[tvId]";
import User from "./pages/users/[name]";
import Watched from "./pages/watched";
import Watchlist from "./pages/watchlist";
import "./styles/main.css";
import { client } from "./utils/apolloClient";
import { theme } from "./utils/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "mash-up",
        element: <MashUp />,
      },
      {
        path: "movies",
        children: [{ path: ":movieId", element: <Movie /> }],
      },
      {
        path: "tv",
        children: [{ path: ":tvId", element: <Tv /> }],
      },
      {
        path: "user",
        children: [{ path: ":name", element: <User /> }],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
      {
        path: "watched",
        element: <Watched />,
      },
      {
        path: "recommendations",
        element: <Recommendations />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </ApolloProvider>,
);
