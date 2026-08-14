import { prisma } from "@/lib/prisma";
import { Message } from "@/types/message";

export async function getMessages(userId: string): Promise<Message[]> {
  return prisma.chat.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
