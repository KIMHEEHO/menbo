import { getAccessToken } from "@/service/github/oauth";
import { syncGithubActivity } from "@/service/github/syncGithubActivity";
import { NextResponse, NextRequest } from "next/server";
import { getGithubUser } from "@/service/github/user";
import { createSession } from "@/service/auth/createSession";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const accessToken = await getAccessToken(code);

  const user = await getGithubUser(accessToken);

  await createSession(user.id, user.login);

  void syncGithubActivity(accessToken, user);

  return NextResponse.redirect(new URL("/home", request.url));
}
