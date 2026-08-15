import { prisma } from "@/lib/prisma";
import { ChatRole } from "@prisma/client";
import { getSession } from "@/lib/session";

export async function saveMessage(role: ChatRole, content: string) {
  const session = await getSession();
  return prisma.chat.create({
    data: {
      userId: session.userId,
      role,
      content,
    },
  });
}
