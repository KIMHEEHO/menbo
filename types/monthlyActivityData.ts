import { WeeklyMonthlySummary } from "./weeklyActivityData";

export type MonthlyActivityData = {
  summary: WeeklyMonthlySummary;
  repo: Repository[];
};

export type Repository = {
  name: string;
  description: string | null;
  pushedAt: string;
  stargazerCount: number;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranchRef?: {
    target?: {
      history?: {
        totalCount: number;
      };
    };
  };
};

export type PrimaryLanguage = {
  name: string;
  color: string;
};
