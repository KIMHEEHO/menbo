import { GITHUB_API_URL } from "./constants";

export async function githubFetch(path: string, accessToken: string) {
  return fetch(`${GITHUB_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  });
}
