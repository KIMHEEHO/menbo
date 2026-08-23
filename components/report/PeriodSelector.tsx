"use client";

import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subWeeks,
  subMonths,
  addWeeks,
  addMonths,
  format,
  isAfter,
  isEqual,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState, useRef } from "react";
import { PeriodType } from "@/types/PeriodType";
import MiniCalendar from "./MiniCalendar";

interface PeriodValue {
  type: PeriodType;
  startDate: Date;
  endDate: Date;
}

interface PeriodSelectorProps {
  defaultType?: PeriodType;
  defaultDate?: Date;
  onChange?: (value: PeriodValue) => void;
}

const getPeriod = (
  date: Date,
  type: PeriodType,
): { startDate: Date; endDate: Date } => {
  if (type === "week") {
    return {
      startDate: startOfWeek(date, { weekStartsOn: 1 }),
      endDate: endOfWeek(date, { weekStartsOn: 1 }),
    };
  }
  return {
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  };
};

export default function PeriodSelector({
  defaultType = "week",
  defaultDate = new Date(),
  onChange,
}: PeriodSelectorProps) {
  const [type, setType] = useState<PeriodType>(defaultType);
  const [date, setDate] = useState(defaultDate);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const { startDate, endDate } = getPeriod(date, type);

  // Calendar 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 💡 핵심: '다음 기간'으로 갈 수 있는지 여부를 체크하는 함수
  const checkIfNextIsDisabled = (targetDate: Date) => {
    const today = new Date();
    const nextPeriodStart =
      type === "week"
        ? startOfWeek(targetDate, { weekStartsOn: 1 })
        : startOfMonth(targetDate);

    const currentPeriodStart =
      type === "week"
        ? startOfWeek(today, { weekStartsOn: 1 })
        : startOfMonth(today);

    // 다음 기간의 시작일이 오늘이 속한 주/달의 시작일과 같거나 이후라면 이동 불가!
    return (
      isAfter(nextPeriodStart, currentPeriodStart) ||
      isEqual(nextPeriodStart, currentPeriodStart)
    );
  };

  const emitChange = (nextDate: Date, nextType = type) => {
    const period = getPeriod(nextDate, nextType);
    onChange?.({
      type: nextType,
      ...period,
    });
  };

  const handlePrev = () => {
    const nextDate = type === "week" ? subWeeks(date, 1) : subMonths(date, 1);
    setDate(nextDate);
    emitChange(nextDate);
  };

  const handleNext = () => {
    const nextDate = type === "week" ? addWeeks(date, 1) : addMonths(date, 1);

    // 만약 다음 기간이 오늘이 속한 주/달이거나 미래라면 아예 실행 안 함
    if (checkIfNextIsDisabled(nextDate)) return;

    setDate(nextDate);
    emitChange(nextDate);
  };

  // 현재 보고 있는 날짜를 기준으로 다음 버튼을 비활성화해야 하는지 판단
  const isNextDisabled = checkIfNextIsDisabled(
    type === "week" ? addWeeks(date, 1) : addMonths(date, 1),
  );

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setCalendarOpen(false);
    emitChange(selectedDate);
  };

  const getLabel = () => {
    if (type === "month") {
      return format(date, "yyyy년 M월", { locale: ko });
    }
    const start = format(startDate, "M월 d일");
    const end = format(endDate, "M월 d일");
    return `${start} - ${end}`;
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm w-full max-w-md">
      {/* 왼쪽 그룹: 이전, 날짜 토글, 다음 */}
      <div className="flex items-center gap-2">
        {/* 이전 버튼 */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="이전 기간"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <ChevronLeft />
        </button>

        {/* 중앙 날짜 선택 영역 */}
        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setCalendarOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors"
          >
            <CalendarIcon />
            <span>{getLabel()}</span>
          </button>

          {/* 팝업 미니 캘린더 */}
          {calendarOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-3">
              <MiniCalendar
                selectedDate={date}
                type={type}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        {/* 다음 버튼 (💡 비활성화 조건 적용) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="다음 기간"
          className={`p-2 rounded-lg transition-colors ${
            isNextDisabled
              ? "opacity-25 cursor-not-allowed text-slate-300"
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-500"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
