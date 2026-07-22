import { prisma } from "@/lib/prisma";
import { GithubEvent } from "@/types/githubEvent";

export async function saveGithubEvents(githubEvents: GithubEvent[]) {
  await prisma.githubEvent.createMany({
    data: githubEvents.map((event) => ({
      id: event.id,
      userLogin: event.actor.login,
      type: event.type,
      repoId: BigInt(event.repo.id),
      repoName: event.repo.name,
      payload: event.payload,
      createdAt: new Date(event.created_at),
    })),
    skipDuplicates: true,
  });
}
