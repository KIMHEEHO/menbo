export function getMonthRange(month: string) {
  const [year, m] = month.split("-").map(Number);

  const start = new Date(Date.UTC(year, m - 1, 1));
  const end = new Date(Date.UTC(year, m, 0, 23, 59, 59));

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}
