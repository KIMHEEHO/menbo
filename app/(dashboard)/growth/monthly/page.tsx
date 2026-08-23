import { getSession } from "@/lib/session";
import { subMonths, format } from "date-fns";
import MonthlyClient from "@/components/report/monthly/MonthlyClient";
import { getMonthlyDataAction } from "@/actions/getMonthlyData";

export default async function growthReport() {
  const date = subMonths(new Date(), 1);
  const month = format(date, "yyyy-MM");

  const session = await getSession();
  // 주간 분석 데이터
  const initialMonthlyAnalysis = await getMonthlyDataAction(
    session.githubLogin,
    month,
  );

  return (
    <MonthlyClient
      accessToken={session.accessToken}
      userLogin={session.githubLogin}
      initialData={initialMonthlyAnalysis}
    />
  );
}
