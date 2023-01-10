import { Person } from "../types/person";

export function isPerson(item: any): item is Person {
  return (item as any).known_for !== undefined || item.media_type === "person";
}
