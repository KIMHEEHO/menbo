import { GithubEvent, MonthlyGithubEventCount } from "@/types/githubEvent";

export async function calculateMonthlySummary(
  events: GithubEvent[],
): Promise<MonthlyGithubEventCount> {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  const year = date.getFullYear();
  const month = date.getMonth();

  const monthlyEvents = events.filter((event: GithubEvent) => {
    const date = new Date(event.created_at);
    return date.getFullYear() === year && date.getMonth() === month;
  });

  const summary: MonthlyGithubEventCount = {
    month: `${year}-${String(month + 1).padStart(2, "0")}`,
    pushCount: 0,
    prCount: 0,
    issueCount: 0,
    repoCount: new Set(monthlyEvents.map((event: GithubEvent) => event.repo.id))
      .size,
    analysis: "",
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
