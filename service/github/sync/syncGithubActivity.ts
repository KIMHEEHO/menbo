import { getGithubEvents } from "../fetch/events";
import { GithubUser } from "@/types/githubUser";
import { upsertUser } from "@/data-access/upsertUser";
import { saveGithubEvents } from "@/data-access/saveGithubEvents";
import { saveMonthlySummary } from "@/data-access/saveMonthlySummary";
import { analyzeMonthly } from "@/service/openai/analyzeMonthly";
import { getMonthlySummary } from "@/data-access/getMonthlySummary";
import { getWeekRange } from "@/utils/getWeekRange";
import { getMonthlyData } from "../fetch/monthly";
import { MonthlySummaryVO } from "@/types/monthlySummaryVO";
import { getWeeklyAnalysisAction } from "@/actions/getWeeklyAnalysis";
import { getGrowthPoint } from "../../openai/growthPoint";
import { Analysis } from "@/types/analysis";
import { getOrGenerateWeeklySummary } from "./getOrGenerateWeeklySummary";

export async function syncGithubActivity(
  accessToken: string,
  user: GithubUser,
) {
  // 사용자 정보 저장
  await upsertUser(user);

  // github event 저장
  const events = await getGithubEvents(accessToken, user.login);
  await saveGithubEvents(events);

  // 주간, 월간 데이터 요청에 필요한 날짜 계산(지난주, 지난달)
  // date:2026-07-03T10:31:28.332Z, month:2026-07
  const { startDate, endDate } = getWeekRange(-1);

  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;

  // 주간 데이터 요청 및 저장
  await getOrGenerateWeeklySummary(accessToken, user.login, startDate, endDate);

  // 월간 데이터 요청
  const monthlyData = await getMonthlyData(accessToken, month);

  // 저장된 월간 데이터 있는지 확인
  const existingMonthly = await getMonthlySummary(user.login, month);

  // 저장된 데이터가 없으면 월간 AI, 성장포인트 분석 후 저장
  if (!existingMonthly) {
    const analysisMonthlyData = await analyzeMonthly(
      monthlyData.summary,
      monthlyData.repo,
    );

    const monthlySummary: MonthlySummaryVO = {
      userLogin: user.login,
      month: month,
      summary: monthlyData.summary,
      repo: monthlyData.repo,
      analysis: {
        positive_feedback: analysisMonthlyData.positive_feedback,
        growth_points: analysisMonthlyData.growth_points,
        next_recommendation: analysisMonthlyData.next_recommendation,
      },
      growthPoint: null,
      createdAt: new Date(),
    };

    const weeklyAnalysis: {
      positive_feedback: string;
      growth_points: string;
      next_recommendation: string;
    }[] = [];

    for (let i = -1; i >= -4; i--) {
      const { startDate } = getWeekRange(i);

      const weekly = await getWeeklyAnalysisAction(user.login, startDate);

      if (weekly?.analysis) {
        weeklyAnalysis.push(weekly.analysis as Analysis);
      }
    }

    // growthPoint 요청
    const growthPoint = await getGrowthPoint(
      monthlySummary.analysis,
      weeklyAnalysis,
    );

    // 월간 요약 저장
    await saveMonthlySummary(user.login, {
      ...monthlySummary,
      growthPoint: growthPoint || null,
    });
  }
}
