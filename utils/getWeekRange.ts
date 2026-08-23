import { addWeeks, subWeeks, startOfWeek, endOfWeek } from "date-fns";

// offsetWeeks: 0이면 이번주, -1이면 지난주, 1이면 다음주
export function getWeekRange(offsetWeeks = 0, baseDate = new Date()) {
  // 1. offset에 따라 주 기준점 이동 (지난주면 subWeeks, 다음주면 addWeeks)
  let targetDate = baseDate;
  if (offsetWeeks < 0) {
    targetDate = subWeeks(baseDate, Math.abs(offsetWeeks));
  } else if (offsetWeeks > 0) {
    targetDate = addWeeks(baseDate, offsetWeeks);
  }

  // 2. 월요일(1) 시작 기준으로 주의 시작일과 종료일 계산
  const startDate = startOfWeek(targetDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(targetDate, { weekStartsOn: 1 });

  return {
    startDate,
    endDate,
  };
}

export function getIsoDate(date: string, isEnd = false) {
  // isEnd가 true면 해당 날짜의 마지막 시간(23:59:59)으로, false면 시작 시간(00:00:00)으로
  const time = isEnd ? "T23:59:59Z" : "T00:00:00Z";
  return `${date}${time}`;
}
