export type GithubEvent = {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    repository_id: number;
    push_id: number;
    ref: string;
    head: string;
    before: string;
  };
  public: boolean;
  created_at: string;
};

export type WeeklyGithubEventCount = {
  startDate: string;
  pushCount: number;
  prCount: number;
  issueCount: number;
  repoCount: number;
  analysis: string;
};

export type MonthlyGithubEventCount = {
  month: string;
  pushCount: number;
  prCount: number;
  issueCount: number;
  repoCount: number;
  analysis: string;
};
