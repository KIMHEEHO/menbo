export function getWeekRange(offsetWeeks = 0) {
  const now = new Date();

  // offsetWeeks 만큼 주(week)를 이동 (지난주는 -1, 이번주는 0, 다음주는 1)
  now.setDate(now.getDate() + offsetWeeks * 7);

  const day = now.getDay();

  // 월요일 기준 시작일 계산
  const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diffToMonday));

  // 일요일 기준 종료일 계산
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);

  // YYYY-MM-DD 포맷으로 변환하는 내부 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    start: formatDate(monday),
    end: formatDate(sunday),
  };
}
