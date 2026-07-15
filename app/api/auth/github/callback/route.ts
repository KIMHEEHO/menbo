import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  console.log("code가 생성되었습니다.", code);

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
    console.log("access_token이 발급되었습니다.", result.access_token);

    const user = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    });

    const userInfo = await user.json();
    console.log("user 정보를 가져왔습니다.", userInfo);
    return NextResponse.json(userInfo);

    // user 정보 db 저장

    // session 생성

    // 로그인 후 리다이렉트할 페이지 근데 로그인 안하면 home으로 들어갈 수 없게 해야함
    // return NextResponse.redirect("/home");
  }
}
