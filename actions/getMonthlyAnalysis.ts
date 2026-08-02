"use server";
import { prisma } from "@/lib/prisma";

export async function getMonthlyAnalysis(userLogin: string, month: string) {
  return await prisma.weeklySummary.findUnique({
    where: {
      userLogin_weekStart: {
        userLogin: userLogin,
        weekStart: month,
      },
    },
    select: {
      analysis: true,
    },
  });
}
