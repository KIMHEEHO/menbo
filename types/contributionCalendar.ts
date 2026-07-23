export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};
