import { Card, Image, Skeleton } from "@mantine/core";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../tmdb/types/movie";
import { Person } from "../tmdb/types/person";
import { Tv } from "../tmdb/types/tv";
import { isMovie } from "../tmdb/utils/isMovie";
import { isPerson } from "../tmdb/utils/isPerson";
import { isTv } from "../tmdb/utils/isTv";

interface PosterProps {
  model?:
    | Pick<Tv, "media_type" | "id" | "poster_path" | "name">
    | Pick<Person, "media_type" | "id" | "profile_path" | "name">
    | Pick<Movie, "media_type" | "id" | "poster_path" | "title">;
  size: "xs" | "sm" | "md" | "lg" | "xl";
}

const Poster = ({ model, size }: PosterProps) => {
  const height = useMemo(() => {
    switch (size) {
      case "xs":
        return 125;
      case "sm":
        return 150;
      case "md":
        return 250;
      case "lg":
        return 300;
      case "xl":
        return 400;
    }
  }, [size]);
  const width = useMemo(() => 2000 * (height / 3000), [height]);

  return (
    <Link
      to={
        model
          ? `/${isMovie(model) ? "movies" : isTv(model) ? "tv" : "person"}/${
              model.id
            }`
          : "#"
      }
    >
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        sx={{
          flexShrink: 0,
          transition: "transform 0.15s ease",
          ":hover": { transform: "scale(1.1)" },
        }}
      >
        <Card.Section>
          <Image
            src={
              model
                ? `https://image.tmdb.org/t/p/original/${
                    isPerson(model)
                      ? model.profile_path
                      : (model as Tv | Movie).poster_path
                  }`
                : null
            }
            height={height}
            width={width}
            alt={
              model
                ? isMovie(model)
                  ? model.title
                  : (model as Tv | Person).name
                : ""
            }
            withPlaceholder
            placeholder={<Skeleton height={height} width={width} />}
          />
        </Card.Section>
      </Card>
    </Link>
  );
};

export default Poster;
