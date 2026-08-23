import { getWeeklySummary } from "@/data-access/getWeeklySummary";
import { getSession } from "@/lib/session";
import { getWeekRange } from "@/utils/getWeekRange";
import WeeklyClient from "@/components/report/weekly/WeeklyClient";

export default async function weeklyReport() {
  const week = getWeekRange(-1);
  const session = await getSession();

  // 초기 데이터 조회
  const initialWeeklyAnalysis = await getWeeklySummary(
    session.githubLogin,
    week.startDate,
  );

  return (
    <WeeklyClient
      accessToken={session.accessToken}
      userLogin={session.githubLogin}
      initialData={initialWeeklyAnalysis}
    />
  );
}
