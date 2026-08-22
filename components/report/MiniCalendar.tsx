import { PeriodType } from "@/types/PeriodType";
import {
  format,
  endOfWeek,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  addMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
interface MiniCalendarProps {
  selectedDate: Date;
  type: PeriodType;
  onSelect: (date: Date) => void;
}

export default function MiniCalendar({
  selectedDate,
  type,
  onSelect,
}: MiniCalendarProps) {
  const [month, setMonth] = useState(startOfMonth(selectedDate));

  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

  const calendarStart = startOfWeek(month, { weekStartsOn: 1 });

  const calendarEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

  const days: Date[] = [];
  let current = calendarStart;

  while (current <= calendarEnd) {
    days.push(current);
    current = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1,
    );
  }

  const selectedStart =
    type === "week"
      ? startOfWeek(selectedDate, { weekStartsOn: 1 })
      : startOfMonth(selectedDate);

  const selectedEnd =
    type === "week"
      ? endOfWeek(selectedDate, { weekStartsOn: 1 })
      : endOfMonth(selectedDate);

  return (
    <div className="mini-calendar">
      <div className="calendar-header">
        <button type="button" onClick={() => setMonth(subMonths(month, 1))}>
          이전
        </button>
        <strong>{format(month, "yyyy년 MM월", { locale: ko })}</strong>
        <button type="button" onClick={() => setMonth(addMonths(month, 1))}>
          다음
        </button>
      </div>
      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-days">
        {days.map((day) => {
          const selected = day >= selectedStart && day <= selectedEnd;
          const currentMonth = isSameMonth(day, month);

          return (
            <button
              key={day.toISOString()}
              type="button"
              className={[
                "calendar-day",
                !currentMonth && "outside",
                selected && "selected",
                isSameDay(day, new Date()) && "today",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onSelect(day)}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
