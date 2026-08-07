import { askAI } from "./client";
import { buildMonthlyPrompt } from "../prompt/monthlyPrompt";
import { WeeklyMonthlySummary } from "@/types/weeklyActivityData";
import { Repository } from "@/types/monthlyActivityData";
import { AnalysisResult } from "@/types/weeklySummaryVO";

export async function analyzeMonthly(
  summary: WeeklyMonthlySummary,
  repo: Repository[],
): Promise<AnalysisResult> {
  const prompt = buildMonthlyPrompt(summary, repo);
  const result = await askAI(prompt);
  return JSON.parse(result) as AnalysisResult;
}
