import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=repo`,
  );
}
