import {
  WeeklyMonthlySummary,
  ContributionDay,
  CommitNode,
} from "@/types/weeklyActivityData";

export type WeeklySummaryVO = {
  userLogin?: string;
  weekStart: string;
  summary: WeeklyMonthlySummary;
  calendar: ContributionDay[];
  commits: CommitNode[];
  analysis?: AnalysisResult;
  createdAt: Date;
};

export type AnalysisResult = {
  positive_feedback: string;
  growth_points: string;
  next_recommendation: string;
};
