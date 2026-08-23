import { prisma } from "@/lib/prisma";
import { WeeklySummaryVO } from "@/types/weeklySummaryVO";
import {
  WeeklyMonthlySummary,
  ContributionDay,
  CommitNode,
} from "@/types/weeklyActivityData";
import { Analysis } from "@/types/analysis";

export async function getWeeklySummary(
  userLogin: string,
  startDate: Date,
): Promise<WeeklySummaryVO | null> {
  const dbData = await prisma.weeklySummary.findUnique({
    where: {
      userLogin_weekStart: {
        userLogin,
        weekStart: startDate.toISOString(),
      },
    },
  });
  if (!dbData) return null;

  const weeklySummaryVO: WeeklySummaryVO = {
    createdAt: dbData.createdAt,
    userLogin: dbData.userLogin,
    weekStart: dbData.weekStart,
    summary: dbData.summary as unknown as WeeklyMonthlySummary,
    calendar: dbData.calendar as unknown as ContributionDay[],
    commits: dbData.commits as unknown as CommitNode[],
    analysis: dbData.analysis as unknown as Analysis,
  };
  return weeklySummaryVO;
}
