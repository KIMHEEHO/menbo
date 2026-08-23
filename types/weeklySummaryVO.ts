import {
  WeeklyMonthlySummary,
  ContributionDay,
  CommitNode,
} from "@/types/weeklyActivityData";
import { Analysis } from "@/types/analysis";

export type WeeklySummaryVO = {
  userLogin?: string;
  weekStart: string | Date;
  summary: WeeklyMonthlySummary;
  calendar: ContributionDay[];
  commits: CommitNode[];
  analysis: Analysis;
  createdAt: Date;
};
