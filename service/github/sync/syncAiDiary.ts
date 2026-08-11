"use server";
import { getDiaryByDate } from "@/actions/getDiaryByDate";
import { getCommits } from "../fetch/commits";
import { getIsoDate } from "@/utils/getWeekRange";
import { writeDiary } from "@/service/openai/writeDiary";
import { saveDiary } from "@/actions/saveDiary";

export default async function syncAiDiary(accessToken: string, date: string) {
  const selectedDate = date.split("T")[0];
  // 1. 기존 일기 조회
  const existingDiary = await getDiaryByDate(new Date(selectedDate));

  if (existingDiary) {
    return existingDiary;
  } else {
    // 2. 해당 날짜의 GitHub 커밋 조회
    const commits = await getCommits(
      accessToken,
      getIsoDate(selectedDate, false),
      getIsoDate(selectedDate, true),
    );

    // 4. 커밋을 기반으로 AI 일기 생성
    const diary = await writeDiary(commits);

    console.log("AI Diary generated:", diary);
    // 5. 생성된 일기를 DB에 저장
    await saveDiary(diary.title, diary.content, new Date(selectedDate));

    return diary;
  }
}
