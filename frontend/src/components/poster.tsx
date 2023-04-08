import { Card, Image, Skeleton } from "@mantine/core";
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface PosterProps {
  model?:
    | {
        __typename?: "Tv";
        id: string;
        tmdbId: string;
        name: string;
        posterPath: string;
      }
    | {
        __typename?: "Movie";
        id: string;
        tmdbId: string;
        title: string;
        posterPath: string;
      };
  size: "xs" | "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
}

const Poster = ({ model, size, asLink = true }: PosterProps) => {
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

  const card = (
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
              ? `https://image.tmdb.org/t/p/original/${model.posterPath}`
              : null
          }
          height={height}
          width={width}
          alt={
            model?.__typename === "Movie"
              ? model.title
              : model?.__typename === "Tv"
              ? model?.name
              : ""
          }
          withPlaceholder
          placeholder={<Skeleton height={height} width={width} />}
        />
      </Card.Section>
    </Card>
  );

  return asLink ? (
    <Link
      to={
        model
          ? `/${
              model.__typename === "Movie"
                ? "movies"
                : model.__typename === "Tv"
                ? "tv"
                : "person"
            }/${model.tmdbId}`
          : "#"
      }
    >
      {card}
    </Link>
  ) : (
    card
  );
};

export default Poster;
