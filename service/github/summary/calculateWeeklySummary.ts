import { WeeklyActivityData } from "@/types/weeklyActivityData";
import { WeeklySummaryVO } from "@/types/weeklySummaryVO";

export async function calculateWeeklySummary(
  weeklyData : WeeklyActivityData
): Promise<WeeklySummaryVO> {

const weeklySummaries: WeeklySummaryVO[] = [];

const summary : WeeklySummaryVO = {
    weekStart: startDate,
    summary: weeklyData.summary,
    calendar: weeklyData.calendar,
    commits: weeklyData.commits,
    analysis: "",
    createdAt: new Date(),
}

  weeklyData.map((data) => {
    summary : WeeklySummaryVO = {
        weekStart: startDate,
        summary: data.summary,
        calendar: data.calendar,
        commits: data.commits,
        analysis: "",
        createdAt: new Date(),
    }
    weeklySummaries.push(summary);
  });

  return weeklySummaries;
}
