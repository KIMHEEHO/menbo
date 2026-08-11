import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function saveDiary(title: string, content: string, date: Date) {
  const session = await getSession();

  return prisma.growthDiary.create({
    data: {
      userId: session.userId,
      title,
      content,
      diaryDate: date,
    },
  });
}
