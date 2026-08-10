import { requestGithubGraphql } from "../api/graphql";
import { RepositoryCommit } from "@/types/commit";

export async function getCommits(
  accessToken: string,
  start: string,
  end: string,
) {
  const query = `
    query {
        viewer {
            repositories(first: 10 orderBy: { field: PUSHED_AT, direction: DESC }) {
                nodes {
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history(
                                    first: 20
                                    since: "${start}"
                                    until: "${end}"
                                    ) {
                                    nodes {
                                        messageHeadline
                                        committedDate
                                        additions
                                        deletions
                                        changedFilesIfAvailable
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

  const response = await requestGithubGraphql(accessToken, query);
  console.log("Commits response:", response);
  return response.data.viewer.repositories.nodes.flatMap(
    (repo: RepositoryCommit) =>
      repo.defaultBranchRef?.target?.history?.nodes ?? [],
  );
}
