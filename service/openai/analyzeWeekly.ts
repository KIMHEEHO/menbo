import { askAI } from "./client";
import { buildWeeklyPrompt } from "../prompt/weeklyPrompt";
import {
  WeeklyMonthlySummary,
  CommitNode,
  ContributionDay,
} from "@/types/weeklyActivityData";
import { AnalysisResult } from "@/types/weeklySummaryVO";

export async function analyzeWeekly(
  summary: WeeklyMonthlySummary,
  calendar: ContributionDay[],
  commits: CommitNode[],
): Promise<AnalysisResult> {
  const prompt = buildWeeklyPrompt(summary, calendar, commits);
  const result = await askAI(prompt);
  return JSON.parse(result) as AnalysisResult;
}
