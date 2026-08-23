"use client";
import { useState } from "react";
import { MonthlySummaryVO } from "@/types/monthlySummaryVO";
import { getOrGenerateMonthlySummary } from "@/service/github/sync/getOrGenerateMonthlySummary";
import PeriodSelector from "../PeriodSelector";
import GitHubActivityCard from "../GitHubActivityCard";
import GrowthPointSection from "./GrowthPointSection";
import { AiInsight } from "../AiInsight";
import RepositoryCard from "./RepositoryCard";
import { Repository } from "@/types/monthlyActivityData";

interface MonthlyClientProps {
  accessToken: string;
  userLogin: string;
  initialData: MonthlySummaryVO | null;
}

export default function MonthlyClient({
  accessToken,
  userLogin,
  initialData,
}: MonthlyClientProps) {
  const [monthlyAanalysisData, setMonthlyAnalysisData] = useState(initialData);

  // 선택한 기간이 변경될 때 호출되는 함수
  const handlePeriodChange = async (value: {
    type: string;
    startDate: Date;
    endDate: Date;
  }) => {
    try {
      const month = value.startDate.toISOString().slice(0, 7); // "YYYY-MM" 형식으로 변환
      const newData = await getOrGenerateMonthlySummary(
        accessToken,
        userLogin,
        month,
      );
      setMonthlyAnalysisData(newData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  const cards = [
    {
      title: "Commit",
      count: monthlyAanalysisData?.summary.totalCommitContributions || 0,
    },
    {
      title: "Pull Request",
      count: monthlyAanalysisData?.summary.totalPullRequestContributions || 0,
    },
    {
      title: "Issue",
      count: monthlyAanalysisData?.summary.totalIssueContributions || 0,
    },
    {
      title: "Repository",
      count: monthlyAanalysisData?.repo.length || 0,
    },
  ];
  return (
    <div className="mx-auto w-full max-w-[1600px] ">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          📊 나의 월간 활동 분석
        </h1>
        <PeriodSelector defaultType="month" onChange={handlePeriodChange} />
      </div>

      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-3 grid grid-cols-2 gap-4 bg-white rounded-xl border p-4 shadow-sm ">
          <h1 className="text-xl font-semibold col-span-2 text-black">
            월간 GitHub 활동 요약
          </h1>
          {cards.map((card) => (
            <GitHubActivityCard
              key={card.title}
              title={card.title}
              count={card.count}
            />
          ))}
        </div>

        <div className="col-span-7  bg-white rounded-xl border p-4 shadow-sm ">
          <h1 className="text-xl font-semibold mb-4 text-black">
            작업한 Repository
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {monthlyAanalysisData?.repo ? (
              monthlyAanalysisData.repo.map((repo: Repository) => (
                <RepositoryCard key={repo.name} {...repo} />
              ))
            ) : (
              <p>Repository 정보가 없습니다.</p>
            )}
          </div>
        </div>

        <div className="col-span-5 rounded-xl border bg-white p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            멘보의 한마디
          </h1>
          {monthlyAanalysisData?.analysis ? (
            <AiInsight analysis={monthlyAanalysisData.analysis} />
          ) : (
            <p>분석 데이터가 없습니다.</p>
          )}
        </div>

        <div className="col-span-5 rounded-xl border bg-muted/50 p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            이번 달 개발 리뷰
          </h1>
          {monthlyAanalysisData?.growthPoint ? (
            <GrowthPointSection review={monthlyAanalysisData.growthPoint} />
          ) : (
            <p>분석 데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
