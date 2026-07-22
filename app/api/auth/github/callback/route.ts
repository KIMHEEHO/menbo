import { getAccessToken } from "@/service/github/oauth";
import { syncGithubActivity } from "@/service/github/syncGithubActivity";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const accessToken = await getAccessToken(code);

  await syncGithubActivity(accessToken);

  return NextResponse.redirect(new URL("/home", request.url));
}
