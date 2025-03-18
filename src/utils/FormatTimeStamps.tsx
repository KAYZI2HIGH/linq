import { parseISO, format } from "date-fns";

export function formatTimestamp(timestamp: string): string {
  try {
    const date = parseISO(timestamp);
    return format(date, "h:mm a");
  } catch {
    return "Invalid Date";
  }
}
