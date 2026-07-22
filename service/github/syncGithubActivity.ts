import { getGithubEvents } from "./events";
import { getGithubUser } from "./user";
import { upsertUser } from "@/data-access/upsertUser";
import { saveWeeklySummary } from "@/data-access/saveWeeklySummary";
import { saveGithubEvents } from "@/data-access/saveGithubEvents";
import { saveMonthlySummary } from "@/data-access/saveMonthlySummary";
import { calculateWeeklySummary } from "./calculateWeeklySummary";
import { calculateMonthlySummary } from "./calculateMonthlySummary";
import { analyzeWeekly } from "@/service/openai/analyzeWeekly";
import { analyzeMonthly } from "@/service/openai/analyzeMonthly";
import { getWeeklySummary } from "@/data-access/getWeeklySummary";
import { getMonthlySummary } from "@/data-access/getMonthlySummary";
import { getWeekRange } from "@/utils/getWeekRange";

export async function syncGithubActivity(accessToken: string) {
  const user = await getGithubUser(accessToken);
  await upsertUser(user);

  const events = await getGithubEvents(accessToken, user.login);
  await saveGithubEvents(events);

  const startDate = getWeekRange(0);
  const start = startDate.start;
  const month = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  const weekly = await getWeeklySummary(user.login, start);
  if (!weekly) {
    const weeklySummaries = await calculateWeeklySummary(events);
    await Promise.all(
      weeklySummaries.map(async (summary) => {
        summary.analysis = await analyzeWeekly(summary);
      }),
    );
    await saveWeeklySummary(user.login, weeklySummaries);
  }

  const monthly = await getMonthlySummary(user.login, month);
  if (!monthly) {
    const monthlySummary = await calculateMonthlySummary(events);
    monthlySummary.analysis = await analyzeMonthly(monthlySummary);
    await saveMonthlySummary(user.login, monthlySummary);
  }
}
