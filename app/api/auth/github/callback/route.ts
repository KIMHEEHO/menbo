import { upsertUserAction } from "@/actions/upsertUser";
import { getAccessToken } from "@/service/github/oauth";
import { getGithubUser } from "@/service/github/user";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const accessToken = await getAccessToken(code);

  const userInfo = await getGithubUser(accessToken);

  await upsertUserAction(userInfo);

  return NextResponse.redirect(new URL("/home", request.url));
}
