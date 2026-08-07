import { prisma } from "@/lib/prisma";

export async function getMonthlySummary(
  userLogin: string,
  month: string,
) {
  return await prisma.monthlySummary.findUnique({
    where: {
      userLogin_month: {
        userLogin,
        month,
      },
    },
  });
}
