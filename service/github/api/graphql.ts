import { GITHUB_GRAPHQL_URL } from "./constants";

export async function requestGithubGraphql(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
