"use server";

import { getWeeklyAnalysis } from "@/data-access/getWeeklyAnalysis";

export async function getWeeklyAnalysisAction(
  userLogin: string,
  start: string,
) {
  return await getWeeklyAnalysis(userLogin, start);
}
