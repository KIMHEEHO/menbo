"use client";

import { DiaryCalendar } from "./DiaryCalendar";
import { DiaryCard } from "./DiaryCard";
import { useState } from "react";
import syncAiDiary from "@/service/github/sync/syncAiDiary";
type Diary = {
  title: string;
  content: string;
};

interface DiaryClientProps {
  accessToken: string;
  commitDates: string[];
}

export function DiaryClient({ accessToken, commitDates }: DiaryClientProps) {
  const [date, setDate] = useState<Date>();
  const [diary, setDiary] = useState<Diary | null>(null);

  const handleDateChange = async (newDate: Date | undefined) => {
    setDate(newDate);

    if (!newDate) {
      setDiary(null);
      return;
    }

    setDiary(await syncAiDiary(accessToken, newDate.toISOString()));
  };

  return (
    <>
      <div className="grid h-full grid-cols-5">
        <section className="col-span-1 border-r p-6">
          <DiaryCalendar
            date={date}
            setDate={handleDateChange}
            commitDates={commitDates}
          />
        </section>
        <section className="col-span-3 p-8">
          {diary && (
            <DiaryCard
              title={diary.title}
              content={diary.content}
              date={date as Date}
            />
          )}
        </section>
      </div>
    </>
  );
}
