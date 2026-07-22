import { prisma } from "@/lib/prisma";
import { MonthlyGithubEventCount } from "@/types/githubEvent";

export async function saveMonthlySummary(
  userLogin: string,
  summary: MonthlyGithubEventCount,
) {
  await prisma.monthlySummary.upsert({
    where: {
      userLogin_month: {
        userLogin: userLogin,
        month: summary.month,
      },
    },
    update: {
      pushCount: summary.pushCount,
      prCount: summary.prCount,
      issueCount: summary.issueCount,
      repoCount: summary.repoCount,
      analysis: summary.analysis,
    },
    create: {
      userLogin,
      month: summary.month,
      pushCount: summary.pushCount,
      prCount: summary.prCount,
      issueCount: summary.issueCount,
      repoCount: summary.repoCount,
      analysis: summary.analysis,
    },
  });
}
