"use server";

import getUserProfile from "@/data-access/getUserProfile";

export async function getUserInfo(userId: string) {
  return await getUserProfile(userId);
}
