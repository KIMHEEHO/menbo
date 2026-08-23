import { parse, startOfMonth, endOfMonth } from "date-fns";

export function getMonthRange(month: string) {
  const baseDate = parse(month, "yyyy-MM", new Date());

  const start = startOfMonth(baseDate);
  const end = endOfMonth(baseDate);

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}
