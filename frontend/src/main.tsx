import "@fontsource/nunito";
import "@fontsource/righteous";
import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layouts/appLayout";
import { Home } from "./pages";
import Discover from "./pages/discover";
import MashUp from "./pages/mash-up";
import Movie from "./pages/movies/[movieId]";
import Recommendations from "./pages/recommendations";
import Watchlist from "./pages/watchlist";
import "./styles/main.css";
import { TmdbClient } from "./tmdb/client";
import TmdbClientProvider from "./tmdb/context";
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
        path: "search",
        element: null,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
      {
        path: "recommendations",
        element: <Recommendations />,
      },
    ],
  },
]);

const tmdbClient = new TmdbClient({
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TmdbClientProvider client={tmdbClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </TmdbClientProvider>
);
