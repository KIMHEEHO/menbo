import { getAccessToken } from "@/service/github/api/oauth";
import { NextResponse, NextRequest } from "next/server";
import { getGithubUser } from "@/service/github/fetch/user";
import { createSession } from "@/service/auth/createSession";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const accessToken = await getAccessToken(code);

  const user = await getGithubUser(accessToken);

  await createSession(user.id, user.login, accessToken);

  return NextResponse.redirect(new URL("/init", request.url));
}
