import { Repository } from "./monthlyActivityData";
import { WeeklyMonthlySummary } from "./weeklyActivityData";

export type MonthlySummaryVO = {
  userLogin: string;
  month: string;
  summary: WeeklyMonthlySummary;
  repo: Repository[];
  analysis: {
    positive_feedback: string;
    growth_points: string;
    next_recommendation: string;
  };
  growthPoint?: {
    positive_feedback: string;
    growth_points: string;
    next_recommendation: string;
  };
  createdAt: Date;
};
