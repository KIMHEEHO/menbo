import { askAI } from "./client";
import { buildMonthlyPrompt } from "../prompt/monthlyPrompt";
import { WeeklyMonthlySummary } from "@/types/weeklyActivityData";
import { Repository } from "@/types/monthlyActivityData";
import { Analysis } from "@/types/analysis";

export async function analyzeMonthly(
  summary: WeeklyMonthlySummary,
  repo: Repository[],
): Promise<Analysis> {
  const prompt = buildMonthlyPrompt(summary, repo);
  return await askAI(prompt);
}
