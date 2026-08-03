import { prisma } from "@/lib/prisma";

export default async function getUserProfile(userId: string) {
  return await prisma.user.findFirst({
    where: {
      githubId: userId,
    },
  });
}
