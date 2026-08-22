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

  // Caledar 외부 클릭 시 닫기
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

  // 날짜 변경 시 onChange 호출
  const emitChange = (nextDate: Date, nextType = type) => {
    const period = getPeriod(nextDate, nextType);

    onChange?.({
      type: nextType,
      ...period,
    });
  };

  // 이전, 다음, 오늘 버튼 핸들러
  const handlePrev = () => {
    const nextDate = type === "week" ? subWeeks(date, 1) : subMonths(date, 1);
    setDate(nextDate);
    emitChange(nextDate);
  };

  const handleNext = () => {
    const nextDate = type === "week" ? addWeeks(date, 1) : addMonths(date, 1);
    setDate(nextDate);
    emitChange(nextDate);
  };

  const handleToday = () => {
    const today = new Date();
    setDate(today);
    setCalendarOpen(false);
    emitChange(today);
  };

  // MiniCalendar에서 날짜 선택 시 호출되는 핸들러
  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setCalendarOpen(false);
    emitChange(selectedDate);
  };

  // 선택된 기간을 표시
  const getLabel = () => {
    if (type === "month") {
      return format(date, "yyyy년 M월", { locale: ko });
    }

    const start = format(startDate, "M월 d일");
    const end = format(endDate, "M월 d일");

    return `${start} - ${end}`;
  };

  return (
    <div>
      <div>
        <button type="button" onClick={handlePrev} aria-label="이전 기간">
          <ChevronLeft />
        </button>
        <div ref={calendarRef}>
          <button
            type="button"
            onClick={() => setCalendarOpen((prev) => !prev)}
          >
            <CalendarIcon />
            <span>{getLabel()}</span>
          </button>
          {calendarOpen && (
            <MiniCalendar
              selectedDate={date}
              type={type}
              onSelect={handleDateSelect}
            />
          )}
        </div>
        <button type="button" onClick={handleNext} aria-label="다음 기간">
          <ChevronRight />
        </button>
        <button type="button" onClick={handleToday}>
          오늘
        </button>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
