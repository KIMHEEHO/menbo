"use server";

import { getMonthlyAnalysis } from "@/data-access/getMonthlyAnalysis";

export async function getMonthlyAnalysisAction(
  userLogin: string,
  month: string,
) {
  return await getMonthlyAnalysis(userLogin, month);
}
