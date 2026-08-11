"use server";
import { DiaryClient } from "@/components/diary/DiaryClient";
import { getSession } from "@/lib/session";
import getCommitDates from "@/service/github/fetch/commitDates";
import { getIsoDate } from "@/utils/getWeekRange";

export default async function aiDiary() {
  const session = await getSession();
  const endDate = new Date().toISOString().split("T")[0];
  const commitDates = await getCommitDates(
    session.accessToken,
    getIsoDate("2026-01-01"),
    getIsoDate(endDate, true),
  );
  return (
    <>
      <DiaryClient
        accessToken={session.accessToken}
        commitDates={commitDates}
      />
    </>
  );
}
