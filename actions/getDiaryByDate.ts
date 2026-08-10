"use server";

import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function getDiaryByDate(date: Date) {
  const session = await getSession();

  return prisma.growthDiary.findFirst({
    where: {
      userId: session.userId,
      diaryDate: date,
    },
  });
  //   return {
  //     title: "드디어 사이드바를 완성했다.",
  //     content:
  //       "드디어~ 사이드바에 프로필 사진도 넣고~ 이름도 넣고~ 로그아웃 기능도 넣고~ 접었다~ 폈다하는 기능도 넣고~ 멘보 색깔 정해서 사이드바에 색깔도 적용해주었다 나 역시 멋져 🌱",
  //     diaryDate: date,
  //   };
}
