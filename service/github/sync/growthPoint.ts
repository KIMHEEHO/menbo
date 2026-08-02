import { askAI } from "@/service/openai/client";
import { buildGrowthPointPrompt } from "@/service/prompt/growthPointPrompt";

export async function getGrowthPoint(
  monthlySummary: string,
  weeklySummary: string[],
) {
  const prompt = buildGrowthPointPrompt(
    monthlySummary,
    weeklySummary.join("\n"),
  );

  return await askAI(prompt);
}
