"use server";
import { getWeeklyData } from "../fetch/weekly";
import { getWeeklySummary } from "@/data-access/getWeeklySummary";
import { analyzeWeekly } from "@/service/openai/analyzeWeekly";
import { saveWeeklySummary } from "@/data-access/saveWeeklySummary";

export async function getOrGenerateWeeklySummary(
  accessToken: string,
  userLogin: string,
  startDate: Date,
  endDate: Date,
) {
  // 1. 저장된 주간 데이터 있는지 확인
  let weeklySummary = await getWeeklySummary(userLogin, startDate);

  // 2. 없으면 데이터 요청 후 AI 분석 및 저장
  if (!weeklySummary) {
    const weeklyData = await getWeeklyData(accessToken, startDate, endDate);

    const analysisData = await analyzeWeekly(
      weeklyData.summary,
      weeklyData.chart,
      weeklyData.commits,
    );

    weeklySummary = {
      userLogin,
      weekStart: startDate,
      summary: weeklyData.summary,
      calendar: weeklyData.chart,
      commits: weeklyData.commits,
      analysis: {
        positive_feedback: analysisData.positive_feedback,
        growth_points: analysisData.growth_points,
        next_recommendation: analysisData.next_recommendation,
      },
      createdAt: new Date(),
    };

    await saveWeeklySummary(userLogin, weeklySummary);
  }

  return weeklySummary;
}
