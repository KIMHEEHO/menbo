import { upsertUserAction } from "@/actions/upsertUser";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  // code를 이용하여 access_token 발급
  if (code !== null) {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID!,
          client_secret: process.env.GITHUB_CLIENT_SECRET!,
          code: code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI!,
        }),
      },
    );

    const result = await response.json();

    const user = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    });

    const userInfo = await user.json();

    // user 정보 db 저장
    await upsertUserAction(userInfo);

    // session 생성(추후 예정)

    // 로그인 후 리다이렉트할 페이지
    return NextResponse.redirect(new URL("/home", request.url));
  }

  //code가 없을 경우 "/"경로로 리다이렉션
  return NextResponse.redirect(new URL("/", request.url));
}
