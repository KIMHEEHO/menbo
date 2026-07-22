import { getGithubEvents } from "./events";
import { getGithubUser } from "./user";
import { upsertUser } from "@/data-access/upsertUser";
import { saveWeeklySummary } from "@/data-access/saveWeeklySummary";
import { saveGithubEvents } from "@/data-access/saveGithubEvents";
import { saveMonthlySummary } from "@/data-access/saveMonthlySummary";
import { CalculateWeeklySummary } from "./calculateWeeklySummary";
import { CalculateMonthlySummary } from "./calculateMonthlySummary";

export async function syncGithubActivity(accessToken: string) {
  const user = await getGithubUser(accessToken);
  await upsertUser(user);

  const events = await getGithubEvents(accessToken, user.login);
  await saveGithubEvents(events);

  const weeklySummaries = await CalculateWeeklySummary(events);
  await saveWeeklySummary(user.login, weeklySummaries);

  const monthlySummary = await CalculateMonthlySummary(events);
  await saveMonthlySummary(user.login, monthlySummary);
}
