import { WeeklyGithubEventCount } from "@/types/githubEvent";
import { askAI } from "./client";
import { buildWeeklyPrompt } from "../prompt/weeklyPrompt";

export async function analyzeWeekly(summary: WeeklyGithubEventCount) {
  const prompt = buildWeeklyPrompt(summary);
  return await askAI(prompt);
}
