"use server";
import { getMonthlyData } from "../fetch/monthly";
import { getMonthlySummary } from "@/data-access/getMonthlySummary";
import { analyzeMonthly } from "@/service/openai/analyzeMonthly";
import { saveMonthlySummary } from "@/data-access/saveMonthlySummary";
import { getWeeklyAnalysis } from "@/data-access/getWeeklyAnalysis";
import { getGrowthPoint } from "../../openai/growthPoint";
import { getWeekRange } from "@/utils/getWeekRange";
import { MonthlySummaryVO } from "@/types/monthlySummaryVO";
import { Analysis } from "@/types/analysis";

export async function getOrGenerateMonthlySummary(
  accessToken: string,
  userLogin: string,
  month: string
): Promise<MonthlySummaryVO | null> {
  // 1. 저장된 월간 데이터가 있는지 먼저 확인! (있으면 굳이 깃헙/AI 부를 필요 없음)
  const existingMonthly = await getMonthlySummary(userLogin, month);
  if (existingMonthly) {
    return existingMonthly;
  }

  // 2. 저장된 월간 데이터가 없으면 깃헙 API 호출해서 월간 데이터 가져오기
  const monthlyData = await getMonthlyData(accessToken, month);

  // 3. 월간 AI 분석 및 성장 포인트 분석
  const analysisMonthlyData = await analyzeMonthly(
    monthlyData.summary,
    monthlyData.repo
  );

  // month가 "2026-07" 형태라면, 해당 월의 기준 날짜를 만듭니다.
  const [year, monthNum] = month.split("-").map(Number);
  // 해당 월의 마지막 날(또는 월 중 하루)을 baseDate로 설정
  const baseDateForMonth = new Date(year, monthNum, 0); // monthNum은 1~12인데 Date 생성자의 month는 0~11이므로 자동으로 해당 월의 말일이 됨!

  const weeklyAnalysis: Analysis[] = [];

  for (let i = -1; i >= -4; i--) {
    const { startDate } = getWeekRange(i, baseDateForMonth);
    const weekly = await getWeeklyAnalysis(userLogin, startDate);

    if (weekly?.analysis) {
      weeklyAnalysis.push(weekly.analysis as Analysis);
    }
  }

  const growthPoint = await getGrowthPoint(
    {
      positive_feedback: analysisMonthlyData.positive_feedback,
      growth_points: analysisMonthlyData.growth_points,
      next_recommendation: analysisMonthlyData.next_recommendation,
    },
    weeklyAnalysis
  );

  // 4. 저장할 객체 조립
  const monthlySummary: MonthlySummaryVO = {
    userLogin,
    month,
    summary: monthlyData.summary,
    repo: monthlyData.repo,
    analysis: {
      positive_feedback: analysisMonthlyData.positive_feedback,
      growth_points: analysisMonthlyData.growth_points,
      next_recommendation: analysisMonthlyData.next_recommendation,
    },
    growthPoint: growthPoint || null,
    createdAt: new Date(),
  };

  // 5. DB에 저장 후 반환
  await saveMonthlySummary(userLogin, monthlySummary);

  return monthlySummary;
}
