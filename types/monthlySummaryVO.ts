import { Repository } from "./monthlyActivityData";
import { WeeklyMonthlySummary } from "./weeklyActivityData";

export type MonthlySummaryVO = {
  userLogin: string;
  month: string;
  summary: WeeklyMonthlySummary;
  repo: Repository[];
  analysis: string;
  growthPoint: string;
  createdAt: Date;
};
