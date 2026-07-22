import { MonthlyGithubEventCount } from "@/types/githubEvent";
import { askAI } from "./client";
import { buildMonthlyPrompt } from "../prompt/monthlyPrompt";
export async function analyzeMonthly(summary: MonthlyGithubEventCount) {
  const prompt = buildMonthlyPrompt(summary);
  return await askAI(prompt);
}
