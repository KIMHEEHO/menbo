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
