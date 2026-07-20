import { prisma } from "@/lib/prisma";
import { GithubUser } from "@/types/githubUser";

export async function upsertUser(userInfo: GithubUser) {
  await prisma.user.upsert({
    where: {
      githubId: String(userInfo.id),
    },
    update: {
      userName: userInfo.name ?? userInfo.login,
      avatarUrl: userInfo.avatar_url,
      email: userInfo.email,
    },
    create: {
      githubId: String(userInfo.id),
      userName: userInfo.name ?? userInfo.login,
      avatarUrl: userInfo.avatar_url,
      email: userInfo.email,
    },
  });
}
