import { RepositoryCommit } from "@/types/weeklyActivityData";
import { requestGithubGraphql } from "../api/graphql";
export default async function getCommitDates(
  accessToken: string,
  start: string,
  end: string,
): Promise<string[]> {
  const query = `
        query {
            viewer {
                repositories(first: 100 orderBy: { field: PUSHED_AT, direction: DESC }) {
                    nodes {
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    history(
                                        first: 100
                                        since: "${start}"
                                        until: "${end}"
                                        ) {
                                        nodes {
                                 
                                            committedDate
                         
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
  return [
    ...new Set<string>(
      response.data.viewer.repositories.nodes.flatMap(
        (repo: RepositoryCommit) =>
          repo.defaultBranchRef?.target?.history?.nodes.map(
            (commit: { committedDate: string }) =>
              commit.committedDate.split("T")[0],
          ) ?? [],
      ),
    ),
  ];
}
