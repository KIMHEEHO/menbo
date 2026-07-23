import { requestGithubGraphql } from "../api/graphql";
import { getWeekRange } from "@/utils/getWeekRange";
import { RepositoryCommit } from "@/types/commit";

function getIsoDate(date: string, isEnd = false) {
  // isEnd가 true면 해당 날짜의 마지막 시간(23:59:59)으로, false면 시작 시간(00:00:00)으로
  const time = isEnd ? "T23:59:59Z" : "T00:00:00Z";
  return `${date}${time}`;
}

export async function getCommits(accessToken: string) {
  const { start, end } = getWeekRange();
  const startIso = getIsoDate(start, false);
  const endIso = getIsoDate(end, true);

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
                                    since: "${startIso}"
                                    until: "${endIso}"
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

  return response.data.viewer.repositories.nodes.flatMap(
    (repo: RepositoryCommit) =>
      repo.defaultBranchRef?.target?.history?.nodes ?? [],
  );
}
