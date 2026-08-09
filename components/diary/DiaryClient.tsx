"use client";

import { DiaryCalendar } from "./DiaryCalendar";
import { DiaryCard } from "./DiaryCard";
import { useState } from "react";
import { getDiaryByDate } from "@/actions/getDiaryByDate";

type Diary = {
  title: string;
  content: string;
  diaryDate: Date;
};

export function DiaryClient() {
  const [date, setDate] = useState<Date>();
  const [diary, setDiary] = useState<Diary | null>(null);

  const handleDateChange = async (newDate: Date | undefined) => {
    setDate(newDate);

    if (!newDate) {
      setDiary(null);
      return;
    }

    const result = await getDiaryByDate(newDate);
    setDiary(result);
  };

  return (
    <>
      <div className="grid h-full grid-cols-5">
        <section className="col-span-1 border-r p-6">
          <DiaryCalendar date={date} setDate={handleDateChange} />
        </section>
        <section className="col-span-3 p-8">
          {diary && (
            <DiaryCard
              title={diary.title}
              content={diary.content}
              date={diary.diaryDate}
            />
          )}
        </section>
      </div>
    </>
  );
}
