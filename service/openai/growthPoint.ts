import { askAI } from "@/service/openai/client";
import { buildGrowthPointPrompt } from "@/service/prompt/growthPointPrompt";
import { AnalysisResult } from "@/types/weeklySummaryVO";
import { MonthlyReviewResult } from "@/types/monthlySummaryVO";

export async function getGrowthPoint(
  monthlySummary: AnalysisResult,
  weeklySummary: AnalysisResult[],
): Promise<MonthlyReviewResult> {
  const prompt = buildGrowthPointPrompt(monthlySummary, weeklySummary);

  return await askAI(prompt);
}
