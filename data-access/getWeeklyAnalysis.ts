import { prisma } from "@/lib/prisma";

export async function getWeeklyAnalysis(userLogin: string, start: Date) {
  return await prisma.weeklySummary.findUnique({
    where: {
      userLogin_weekStart: {
        userLogin: userLogin,
        weekStart: start,
      },
    },
    select: {
      analysis: true,
    },
  });
}
