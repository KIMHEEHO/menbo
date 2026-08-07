import { askAI } from "@/service/openai/client";
import { buildGrowthPointPrompt } from "@/service/prompt/growthPointPrompt";
import { AnalysisResult } from "@/types/weeklySummaryVO";

export async function getGrowthPoint(
  monthlySummary: AnalysisResult,
  weeklySummary: AnalysisResult[],
) {
  const prompt = buildGrowthPointPrompt(monthlySummary, weeklySummary);

  return await askAI(prompt);
}
