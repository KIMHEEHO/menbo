"use server";

import { getSession } from "@/lib/session";
import {
  syncUser,
  syncEvents,
  syncWeeklySummary,
  syncMonthlySummary,
} from "@/service/github/sync/syncGithubActivity";

// accessToken은 클라이언트로 넘기지 않고 서버의 세션에서만 꺼내 사용
async function getLoggedInSession() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.accessToken) {
    throw new Error("로그인 정보가 없습니다.");
  }

  return session;
}

export async function checkLoginAction() {
  const session = await getSession();
  return Boolean(session.isLoggedIn && session.accessToken);
}

export async function syncUserAction() {
  const session = await getLoggedInSession();
  await syncUser(session.accessToken);
}

export async function syncEventsAction() {
  const session = await getLoggedInSession();
  await syncEvents(session.accessToken, session.githubLogin);
}

export async function syncWeeklySummaryAction() {
  const session = await getLoggedInSession();
  await syncWeeklySummary(session.accessToken, session.githubLogin);
}

export async function syncMonthlySummaryAction() {
  const session = await getLoggedInSession();
  await syncMonthlySummary(session.accessToken, session.githubLogin);
}
