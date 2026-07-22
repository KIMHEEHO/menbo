import { GithubEvent, MonthlyGithubEventCount } from "@/types/githubEvent";

export async function CalculateMonthlySummary(
  events: GithubEvent[],
): Promise<MonthlyGithubEventCount> {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const monthlyEvents = events.filter((event: GithubEvent) => {
    const date = new Date(event.created_at);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });

  const summary: MonthlyGithubEventCount = {
    month: `${year}-${String(month).padStart(2, "0")}`,
    pushCount: 0,
    prCount: 0,
    issueCount: 0,
    repoCount: new Set(monthlyEvents.map((event: GithubEvent) => event.repo.id))
      .size,
  };

  monthlyEvents.forEach((event: GithubEvent) => {
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
  return summary;
}
