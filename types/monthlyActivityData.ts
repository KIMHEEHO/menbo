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
  primaryLanguage: PrimaryLanguage | null;
};

export type PrimaryLanguage = {
  name: string;
  color: string;
};
