import { prisma } from "@/lib/prisma";
import { ChatRole } from "@prisma/client";

export async function saveMessage(
  userId: string,
  role: ChatRole,
  content: string,
) {
  return prisma.chat.create({
    data: {
      userId,
      role,
      content,
    },
  });
}
