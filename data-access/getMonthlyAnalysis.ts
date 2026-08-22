import { prisma } from "@/lib/prisma";
import { Analysis } from "@/types/analysis";
import { MonthlyReviewResult } from "@/types/monthlySummaryVO";

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
    analysis: result.analysis as Analysis,
    growthPoint: result.growthPoint as MonthlyReviewResult | null,
  };
}
