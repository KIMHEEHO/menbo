import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export function DiaryCalendar({
  date,
  setDate,
  commitDates,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  commitDates: string[];
}) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(day) => !commitDates.includes(format(day, "yyyy-MM-dd"))}
    />
  );
}
