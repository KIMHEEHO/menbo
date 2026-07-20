"use server";

import { upsertUser } from "@/data-access/upsertUser";
import { GithubUser } from "@/types/githubUser";

export async function upsertUserAction(userInfo: GithubUser) {
  return upsertUser(userInfo);
}
