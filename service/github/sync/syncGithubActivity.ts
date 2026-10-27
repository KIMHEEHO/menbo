import { getGithubEvents } from "../fetch/events";
import { getGithubUser } from "../fetch/user";
import { GithubUser } from "@/types/githubUser";
import { upsertUser } from "@/data-access/upsertUser";
import { saveGithubEvents } from "@/data-access/saveGithubEvents";
import { getWeekRange } from "@/utils/getWeekRange";
import { getOrGenerateWeeklySummary } from "./getOrGenerateWeeklySummary";
import { getOrGenerateMonthlySummary } from "./getOrGenerateMonthlySummary";

// 사용자 정보 요청 및 저장
export async function syncUser(accessToken: string) {
  const user: GithubUser = await getGithubUser(accessToken);
  await upsertUser(user);

  return user;
}

// github event 요청 및 저장
export async function syncEvents(accessToken: string, userLogin: string) {
  const events = await getGithubEvents(accessToken, userLogin);
  await saveGithubEvents(events);
}

// 주간 데이터 요청 및 저장 (지난주)
export async function syncWeeklySummary(
  accessToken: string,
  userLogin: string,
) {
  const { startDate, endDate } = getWeekRange(-1);

  await getOrGenerateWeeklySummary(accessToken, userLogin, startDate, endDate);
}

// 월간 데이터 요청 및 저장 (지난달)
// month:2026-07
export async function syncMonthlySummary(
  accessToken: string,
  userLogin: string,
) {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;

  await getOrGenerateMonthlySummary(accessToken, userLogin, month);
}

export async function syncGithubActivity(accessToken: string) {
  const user = await syncUser(accessToken);
  await syncEvents(accessToken, user.login);
  await syncWeeklySummary(accessToken, user.login);
  await syncMonthlySummary(accessToken, user.login);
}
