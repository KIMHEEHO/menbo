import { githubFetch } from "../api/client";

export async function getGithubEvents(accessToken: string, username: string) {
  const response = await githubFetch(`/users/${username}/events`, accessToken);

  return response.json();
}
