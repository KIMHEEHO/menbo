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
  isAfter,
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

  // 💡 오늘 기준으로 '선택 가능한 마지막 시점' 계산
  // type이 'week'면 이번 주의 시작일(월요일) 전까지만 선택 가능 (즉, 지난주까지만 허용)
  // type이 'month'면 이번 달의 시작일 전까지만 선택 가능 (즉, 지난달까지만 허용)
  const today = new Date();
  const maxSelectableDate =
    type === "week"
      ? startOfWeek(today, { weekStartsOn: 1 })
      : startOfMonth(today);

  return (
    <div className="w-72 bg-white rounded-2xl p-4 select-none shadow-lg border border-slate-100">
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors text-xs font-medium"
          type="button"
          onClick={() => setMonth(subMonths(month, 1))}
        >
          이전
        </button>
        <strong className="text-sm font-semibold text-slate-800">
          {format(month, "yyyy년 MM월", { locale: ko })}
        </strong>
        <button
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors text-xs font-medium"
          type="button"
          onClick={() => setMonth(addMonths(month, 1))}
        >
          다음
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2 text-center">
        {weekDays.map((day, idx) => (
          <span
            key={day}
            className={`text-xs font-medium ${idx >= 5 ? "text-rose-400" : "text-slate-400"}`}
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {days.map((day) => {
          const currentMonth = isSameMonth(day, month);

          // 💡 핵심 로직: 이 날짜가 '선택 불가능한 미래/이번 주(달)'인지 체크
          // 주의 시작일/시작월 기준으로 비교하여, 오늘이 속한 주/달 혹은 그 이후면 전부 차단!
          const dayPeriodStart =
            type === "week"
              ? startOfWeek(day, { weekStartsOn: 1 })
              : startOfMonth(day);

          const isDisabled = !isAfter(maxSelectableDate, dayPeriodStart);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled} // 👈 HTML 버튼 자체를 비활성화
              className={`
                h-9 w-full flex items-center justify-center text-xs font-medium transition-all relative rounded-xl
                ${!currentMonth ? "text-slate-300" : "text-slate-700"}
                ${isDisabled ? "opacity-30 cursor-not-allowed hover:bg-transparent" : "hover:bg-slate-100"}
              `}
              onClick={() => !isDisabled && onSelect(day)}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
