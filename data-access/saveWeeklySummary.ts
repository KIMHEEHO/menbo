import { prisma } from "@/lib/prisma";
import { WeeklySummaryVO } from "@/types/weeklySummaryVO";

export async function saveWeeklySummary(
  userLogin: string,
  summary: WeeklySummaryVO,
) {
  await prisma.weeklySummary.upsert({
    where: {
      userLogin_weekStart: {
        userLogin: userLogin,
        weekStart: new Date(summary.weekStart),
      },
    },
    update: {
      summary: summary.summary,
      calendar: summary.calendar,
      commits: summary.commits,
      analysis: summary.analysis,
    },
    create: {
      userLogin,
      weekStart: new Date(summary.weekStart),
      summary: summary.summary,
      calendar: summary.calendar,
      commits: summary.commits,
      analysis: summary.analysis,
      createdAt: new Date(),
    },
  });
}
