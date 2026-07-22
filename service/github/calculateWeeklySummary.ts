import { GithubEvent, WeeklyGithubEventCount } from "@/types/githubEvent";
import { getWeekRange } from "@/utils/getWeekRange";

export async function CalculateWeeklySummary(
  events: GithubEvent[],
): Promise<WeeklyGithubEventCount[]> {
  const summaries: WeeklyGithubEventCount[] = [];

  for (let i = 0; i > -4; i--) {
    const { start: startDate, end: endDate } = getWeekRange(i);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const weeklyEvents = events.filter((event: GithubEvent) => {
      const date = new Date(event.created_at);

      return date >= start && date < end;
    });

    const summary: WeeklyGithubEventCount = {
      startDate: startDate,
      pushCount: 0,
      prCount: 0,
      issueCount: 0,
      repoCount: new Set(
        weeklyEvents.map((event: GithubEvent) => event.repo.id),
      ).size,
    };

    weeklyEvents.forEach((event: GithubEvent) => {
      switch (event.type) {
        case "PushEvent":
          summary.pushCount++;
          break;

        case "IssuesEvent":
          summary.issueCount++;
          break;

        case "PullRequestEvent":
          summary.prCount++;
          break;
      }
    });
    summaries.push(summary);
  }
  return summaries;
}
