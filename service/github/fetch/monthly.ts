import { Repository } from "@/types/monthlyActivityData";
import { requestGithubGraphql } from "../api/graphql";
import { getMonthRange } from "@/utils/getMonthRange";

export async function getMonthlyData(accessToken: string, month: string) {
  const getMonth = getMonthRange(month);
  const query = ` 
    query {
        viewer {
            repositories(first: 10 orderBy: {
                field: PUSHED_AT
                direction: DESC
            }
            ) { 
                nodes { 
                    name 
                    description 
                    pushedAt 
                    stargazerCount 
                    url 
                    primaryLanguage { 
                        name 
                        color 
                    } 
                    repositoryTopics(first: 10) {
                        nodes {
                            topic {
                                name
                            }
                        }
                    }
                } 
            } 
            contributionsCollection(
                from: "${getMonth.from}"
                to: "${getMonth.to}"
            ) {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                totalRepositoryContributions
                }
            }
    }`;

  const response = await requestGithubGraphql(accessToken, query);

  const monthlySummary = response.data.viewer.contributionsCollection;

  const projects = response.data.viewer.repositories.nodes.filter(
    (repo: Repository) => {
      return repo.pushedAt.startsWith(month);
    },
  );

  return {
    summary: monthlySummary,
    repo: projects,
  };
}
