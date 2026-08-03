import { getSession } from "@/lib/session";

export async function createSession(
  userId: string,
  githubLogin: string,
  accessToken: string,
) {
  const session = await getSession();

  session.userId = userId.toString();
  session.githubLogin = githubLogin;
  session.accessToken = accessToken;
  session.isLoggedIn = true;

  await session.save();
}
