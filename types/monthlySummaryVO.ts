import { Repository } from "./monthlyActivityData";
import { WeeklyMonthlySummary } from "./weeklyActivityData";

export type MonthlySummaryVO = {
  userLogin: string;
  month: string;
  summary: WeeklyMonthlySummary;
  repo: Repository[];
  analysis: AnalysisResult;
  growthPoint: MonthlyReviewResult | null;
  createdAt: Date;
};
export type AnalysisResult = {
  positive_feedback: string;
  growth_points: string;
  next_recommendation: string;
};
export type MonthlyReviewResult = {
  summary: string;

  achievement: {
    title: string;
    description: string;
  }[];

  growthAreas: {
    title: string;
    description: string;
  }[];

  nextSteps: string[];
};
