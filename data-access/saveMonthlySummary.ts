import { prisma } from "@/lib/prisma";
import { MonthlySummaryVO } from "@/types/monthlySummaryVO";

export async function saveMonthlySummary(
  userLogin: string,
  summary: MonthlySummaryVO,
) {
  await prisma.monthlySummary.upsert({
    where: {
      userLogin_month: {
        userLogin: userLogin,
        month: summary.month,
      },
    },
    update: {
      summary: summary.summary,
      repo: summary.repo,
      analysis: summary.analysis,
      growthPoint: summary.growthPoint,
    },
    create: {
      userLogin,
      month: summary.month,
      summary: summary.summary,
      repo: summary.repo,
      analysis: summary.analysis,
      growthPoint: summary.growthPoint,
      createdAt: new Date(),
    },
  });
}
