import { askAI } from "./client";
import { buildMonthlyPrompt } from "../prompt/monthlyPrompt";
import { WeeklyMonthlySummary } from "@/types/weeklyActivityData";
import { Repository } from "@/types/monthlyActivityData";

export async function analyzeMonthly(summary: WeeklyMonthlySummary, repo : Repository[]): Promise<string> {
  const prompt = buildMonthlyPrompt(summary, repo);
  return await askAI(prompt);
}
