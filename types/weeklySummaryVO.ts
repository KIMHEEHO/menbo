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
  analysis?: string;
  createdAt: Date;
};
