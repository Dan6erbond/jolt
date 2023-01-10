import { Tv } from "../types/tv";

export function isTv(item: any): item is Tv {
  return (item as any).first_air_date !== undefined || item.media_type === "tv";
}
