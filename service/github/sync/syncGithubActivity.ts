import { getGithubEvents } from "../fetch/events";
import { GithubUser } from "@/types/githubUser";
import { upsertUser } from "@/data-access/upsertUser";
import { saveGithubEvents } from "@/data-access/saveGithubEvents";
import { getWeekRange } from "@/utils/getWeekRange";
import { getOrGenerateWeeklySummary } from "./getOrGenerateWeeklySummary";
import { getOrGenerateMonthlySummary } from "./getOrGenerateMonthlySummary";

export async function syncGithubActivity(
  accessToken: string,
  user: GithubUser,
) {
  // 사용자 정보 저장
  await upsertUser(user);

  // github event 저장
  const events = await getGithubEvents(accessToken, user.login);
  await saveGithubEvents(events);

  // 주간, 월간 데이터 요청에 필요한 날짜 계산(지난주, 지난달)
  // date:2026-07-03T10:31:28.332Z, month:2026-07
  const { startDate, endDate } = getWeekRange(-1);

  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;

  // 주간 데이터 요청 및 저장
  await getOrGenerateWeeklySummary(accessToken, user.login, startDate, endDate);

  // 월간 데이터 요청 및 저장
  await getOrGenerateMonthlySummary(accessToken, user.login, month);
}
