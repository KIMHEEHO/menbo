import { requestGithubGraphql } from "../api/graphql";
import { Repository } from "@/types/repository";

export async function projects(accessToken: string) {
  const query = `
  query { 
    viewer { 
        repositories(
            first: 10   
            orderBy: {
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
                } 
            } 
        } 
    }`;

  const response = await requestGithubGraphql(accessToken, query);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const projects = response.data.viewer.repositories.nodes.filter(
    (repo: Repository) =>
      repo.pushedAt && new Date(repo.pushedAt) >= oneMonthAgo,
  );

  return projects;
}
