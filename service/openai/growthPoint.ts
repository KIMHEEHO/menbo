import { askAI } from "@/service/openai/client";
import { buildGrowthPointPrompt } from "@/service/prompt/growthPointPrompt";
import { Analysis } from "@/types/analysis";
import { MonthlyReviewResult } from "@/types/monthlySummaryVO";

export async function getGrowthPoint(
  monthlySummary: Analysis,
  weeklySummary: Analysis[],
): Promise<MonthlyReviewResult> {
  const prompt = buildGrowthPointPrompt(monthlySummary, weeklySummary);

  return await askAI(prompt);
}
