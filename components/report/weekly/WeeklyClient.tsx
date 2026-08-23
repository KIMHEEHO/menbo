"use client";
import GitHubActivityCard from "@/components/report/GitHubActivityCard";
import WeeklyActivityChart from "@/components/report/weekly/WeeklyChart";
import { WeeklyTimeline } from "@/components/report/weekly/WeeklyTimeline";
import { AiInsight } from "@/components/report/AiInsight";
import PeriodSelector from "@/components/report/PeriodSelector";
import { WeeklySummaryVO } from "@/types/weeklySummaryVO";
import { useState } from "react";
import { getOrGenerateWeeklySummary } from "@/service/github/sync/getOrGenerateWeeklySummary";
interface WeeklyClientProps {
  accessToken: string;
  userLogin: string;
  initialData: WeeklySummaryVO | null; // 초기 데이터
}

export default function WeeklyClient({
  accessToken,
  userLogin,
  initialData,
}: WeeklyClientProps) {
  // 1. 유저가 선택한 날짜/기간을 상태로 관리
  const [weeklyAnalysisData, setWeeklyAnalysisData] = useState(initialData);

  // 2. PeriodSelector에서 날짜를 바꿨을 때 실행될 함수
  const handlePeriodChange = async (value: {
    type: string;
    startDate: Date;
    endDate: Date;
  }) => {
    try {
      const newData = await getOrGenerateWeeklySummary(
        accessToken,
        userLogin,
        value.startDate,
        value.endDate,
      );

      setWeeklyAnalysisData(newData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };
  const cards = [
    {
      title: "Commit",
      count: weeklyAnalysisData?.summary?.totalCommitContributions || 0,
    },
    {
      title: "Pull Request",
      count: weeklyAnalysisData?.summary?.totalPullRequestContributions || 0,
    },
    {
      title: "Issue",
      count: weeklyAnalysisData?.summary?.totalIssueContributions || 0,
    },
    {
      title: "Repository",
      count: weeklyAnalysisData?.summary?.totalRepositoryContributions || 0,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] ">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          📊 나의 주간 활동 분석
        </h1>
        <PeriodSelector defaultType="week" onChange={handlePeriodChange} />
      </div>

      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-3 grid grid-cols-2 gap-4 bg-white rounded-xl border p-4 shadow-sm h-55">
          <h1 className="text-xl font-semibold col-span-2 text-black">
            주간 GitHub 활동 요약
          </h1>
          {cards.map((card) => (
            <GitHubActivityCard
              key={card.title}
              title={card.title}
              count={card.count}
            />
          ))}
        </div>

        <div className="col-span-7 bg-white rounded-xl border p-4 shadow-sm h-55">
          <h1 className="text-xl font-semibold mb-4 text-black">
            주간 GitHub 활동 그래프
          </h1>

          <div className="h-37.5">
            {weeklyAnalysisData?.calendar ? (
              <WeeklyActivityChart chart={weeklyAnalysisData.calendar} />
            ) : (
              <p className="text-sm text-muted-foreground">
                이번 주 활동 그래프가 없습니다.
              </p>
            )}
          </div>
        </div>

        <div className="col-span-5 rounded-xl border bg-card text-card-foreground p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            주간 GitHub 커밋 타임라인
          </h1>
          <div className="space-y-3">
            {weeklyAnalysisData?.commits ? (
              <WeeklyTimeline commits={weeklyAnalysisData.commits} />
            ) : (
              <p className="text-sm text-muted-foreground">
                이번 주 커밋이 없습니다.
              </p>
            )}
          </div>
        </div>

        <div className="col-span-5 rounded-xl border bg-white p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            멘보의 한마디
          </h1>
          {weeklyAnalysisData?.analysis ? (
            <AiInsight analysis={weeklyAnalysisData?.analysis} />
          ) : (
            <p className="text-sm text-muted-foreground">
              이번 주 멘보의 한마디가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
