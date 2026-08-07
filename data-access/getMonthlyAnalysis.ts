import { prisma } from "@/lib/prisma";
import { AnalysisResult } from "@/types/weeklySummaryVO";

export async function getMonthlyAnalysis(userLogin: string, month: string) {
  const result = await prisma.monthlySummary.findUnique({
    where: {
      userLogin_month: {
        userLogin: userLogin,
        month: month,
      },
    },
    select: {
      analysis: true,
      growthPoint: true,
    },
  });

  if (!result) return null;

  return {
    analysis: result.analysis as AnalysisResult,
    growthPoint: result.growthPoint as AnalysisResult,
  };
}
