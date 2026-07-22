import { getSession } from "@/lib/session";

export async function createSession(userId: string, githubLogin: string) {
  const session = await getSession();

  session.userId = userId;
  session.githubLogin = githubLogin;
  session.isLoggedIn = true;

  await session.save();
}
