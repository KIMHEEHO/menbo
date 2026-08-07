"use server";

import { getMonthlySummary } from "@/data-access/getMonthlySummary";

export async function getMonthlyDataAction(userLogin: string, month: string) {
  return await getMonthlySummary(userLogin, month);
}
