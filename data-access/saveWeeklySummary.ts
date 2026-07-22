import { prisma } from "@/lib/prisma";
import { WeeklyGithubEventCount } from "@/types/githubEvent";

export async function saveWeeklySummary(
  userLogin: string,
  summaries: WeeklyGithubEventCount[],
) {
  for (const summary of summaries) {
    await prisma.weeklySummary.upsert({
      where: {
        userLogin_weekStart: {
          userLogin: userLogin,
          weekStart: new Date(summary.startDate),
        },
      },
      update: {
        pushCount: summary.pushCount,
        prCount: summary.prCount,
        issueCount: summary.issueCount,
        repoCount: summary.repoCount,
        analysis: "",
      },
      create: {
        userLogin,
        weekStart: new Date(summary.startDate),
        pushCount: summary.pushCount,
        prCount: summary.prCount,
        issueCount: summary.issueCount,
        repoCount: summary.repoCount,
        analysis: "",
      },
    });
  }
}
