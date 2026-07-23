import { githubFetch } from "../api/client";

export async function getGithubUser(accessToken: string) {
  const response = await githubFetch("/user", accessToken);

  return response.json();
}
