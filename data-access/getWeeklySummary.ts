import { prisma } from "@/lib/prisma";

export async function getWeeklySummary(userLogin: string, startDate: string) {
  return await prisma.weeklySummary.findUnique({
    where: {
      userLogin_weekStart: {
        userLogin,
        weekStart: new Date(startDate),
      },
    },
  });
}
