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
  month: string,
): Promise<MonthlySummaryVO | null> {
  // 1. 저장된 월간 데이터가 있는지 먼저 확인! (있으면 굳이 깃헙/AI 부를 필요 없음)
  const existingMonthly = await getMonthlySummary(userLogin, month);
  if (existingMonthly) {
    return existingMonthly;
  }

  // 2. 없을 때만 깃헙 데이터 긁어오기
  const monthlyData = await getMonthlyData(accessToken, month);

  // 3. 월간 AI 분석 및 성장 포인트 분석 병행
  const analysisMonthlyData = await analyzeMonthly(
    monthlyData.summary,
    monthlyData.repo,
  );

  const weeklyAnalysis: Analysis[] = [];

  for (let i = -1; i >= -4; i--) {
    const { startDate } = getWeekRange(i);
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
    weeklyAnalysis,
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