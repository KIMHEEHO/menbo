import { SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export interface SessionData {
  userId: string;
  githubLogin: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  cookieName: "menbo-session",

  password: process.env.SESSION_PASSWORD!,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function destroySession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  await session.destroy();
}
