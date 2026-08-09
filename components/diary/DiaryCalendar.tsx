import { Calendar } from "@/components/ui/calendar";

export function DiaryCalendar({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}
