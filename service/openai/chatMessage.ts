import { buildChatPrompt } from "../prompt/chatPrompt";
import { MonthlyReviewResult } from "@/types/monthlySummaryVO";
import { Analysis } from "@/types/analysis";
import { Message } from "@/types/message";
import { askAI } from "./client";
import { CommitNode, WeeklyMonthlySummary } from "@/types/weeklyActivityData";
import { Prisma } from "@prisma/client";

export async function createChatMessage(
  weeklyCommits: Prisma.JsonValue | CommitNode[],
  weeklyAnalysis: Prisma.JsonValue | Analysis,
  monthlySummary: Prisma.JsonValue | WeeklyMonthlySummary,
  monthlyAnalysis: Prisma.JsonValue | Analysis,
  growthPoint: Prisma.JsonValue | MonthlyReviewResult,
  message: Message[],
): Promise<{ message: string }> {
  const commits = (weeklyCommits ?? []) as CommitNode[];
  const weeklyAnalysisResult = (weeklyAnalysis ?? {}) as Analysis;
  const monthlyAnalysisResult = (monthlyAnalysis ?? {}) as Analysis;
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
