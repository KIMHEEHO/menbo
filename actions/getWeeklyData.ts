"use server";

import { getWeeklySummary } from "@/data-access/getWeeklySummary";

export async function getWeeklyDataAction(userLogin: string, week: Date) {
  return await getWeeklySummary(userLogin, week);
}
