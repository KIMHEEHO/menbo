"use server";

import { getWeeklySummary } from "@/data-access/getWeeklySummary";

export async function getWeeklyDataAction(userLogin: string, week: string) {
  return await getWeeklySummary(userLogin, week);
}
