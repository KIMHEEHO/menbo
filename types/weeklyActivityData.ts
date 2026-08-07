export type WeeklyActivityData = {
  summary: WeeklyMonthlySummary;
  calendar: ContributionDay[];
  commits: CommitNode[];
};

export type WeeklyMonthlySummary = {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalRepositoryContributions: number;
};

export type CommitNode = {
  messageHeadline: string;
  committedDate: string;
  additions: number;
  deletions: number;
  changedFilesIfAvailable: number;
  url: string;
};

export type RepositoryCommit = {
  defaultBranchRef?: {
    target?: {
      history?: {
        nodes: CommitNode[];
      };
    };
  };
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
  changedFiles: number;
};

export type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};
