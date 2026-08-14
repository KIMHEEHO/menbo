import { buildChatPrompt } from "../prompt/chatPrompt";
import { AnalysisResult, MonthlyReviewResult } from "@/types/monthlySummaryVO";
import { Message } from "@/types/message";
import { askAI } from "./client";
import { CommitNode, WeeklyMonthlySummary } from "@/types/weeklyActivityData";

export async function createChatMessage(
  weeklyCommits: CommitNode[],
  weeklyAnalysis: AnalysisResult,
  monthlySummary: WeeklyMonthlySummary,
  monthlyAnalysis: AnalysisResult,
  growthPoint: MonthlyReviewResult,
  message: Message[],
) {
  const prompt = buildChatPrompt(
    weeklyCommits,
    weeklyAnalysis,
    monthlySummary,
    monthlyAnalysis,
    growthPoint,
    message,
  );
  return await askAI(prompt);
}
