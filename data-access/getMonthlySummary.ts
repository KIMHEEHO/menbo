import { prisma } from "@/lib/prisma";
import { MonthlySummaryVO } from "@/types/monthlySummaryVO";
export async function getMonthlySummary(
  userLogin: string,
  month: string,
) : Promise<MonthlySummaryVO | null> {
  const dbData =  await prisma.monthlySummary.findUnique({
    where: {
      userLogin_month: {
        userLogin,
        month,
      },
    },
  });

  if (!dbData) return null;
  
  const monthlySummaryVO: MonthlySummaryVO = {
    createdAt: dbData.createdAt,
    userLogin: dbData.userLogin,
    month: dbData.month,
    summary: dbData.summary as unknown as MonthlySummaryVO["summary"],
    repo: dbData.repo as unknown as MonthlySummaryVO["repo"],
    analysis: dbData.analysis as unknown as MonthlySummaryVO["analysis"],
    growthPoint: dbData.growthPoint as unknown as MonthlySummaryVO["growthPoint"],
  };
  return monthlySummaryVO;
}
