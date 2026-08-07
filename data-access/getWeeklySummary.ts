import { prisma } from "@/lib/prisma";
import { AnalysisResult } from "@/types/weeklySummaryVO";

export async function getWeeklySummary(userLogin: string, startDate: string) {
  const data = await prisma.weeklySummary.findUnique({
    where: {
      userLogin_weekStart: {
        userLogin,
        weekStart: new Date(startDate),
      },
    },
  });

  return {
    analysis: data?.analysis as AnalysisResult | undefined,
  };
}
