import { Movie } from "../types/movie";

export function isMovie(item: any): item is Movie {
  return (item as any).title !== undefined || item.media_type === "movie";
}
