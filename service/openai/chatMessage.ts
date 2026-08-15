import { buildChatPrompt } from "../prompt/chatPrompt";
import { AnalysisResult, MonthlyReviewResult } from "@/types/monthlySummaryVO";
import { Message } from "@/types/message";
import { askAI } from "./client";
import { CommitNode, WeeklyMonthlySummary } from "@/types/weeklyActivityData";
import { Prisma } from "@prisma/client";

export async function createChatMessage(
  weeklyCommits: Prisma.JsonValue | CommitNode[],
  weeklyAnalysis: Prisma.JsonValue | AnalysisResult,
  monthlySummary: Prisma.JsonValue | WeeklyMonthlySummary,
  monthlyAnalysis: Prisma.JsonValue | AnalysisResult,
  growthPoint: Prisma.JsonValue | MonthlyReviewResult,
  message: Message[],
): Promise<{ message: string }> {
  const commits = (weeklyCommits ?? []) as CommitNode[];
  const weeklyAnalysisResult = (weeklyAnalysis ?? {}) as AnalysisResult;
  const monthlyAnalysisResult = (monthlyAnalysis ?? {}) as AnalysisResult;
  const monthlySummaryData = (monthlySummary ?? {}) as WeeklyMonthlySummary;
  const growthPointData = (growthPoint ?? {}) as MonthlyReviewResult;

  const prompt = buildChatPrompt(
    commits,
    weeklyAnalysisResult,
    monthlySummaryData,
    monthlyAnalysisResult,
    growthPointData,
    message,
  );

  return await askAI(prompt);
}
