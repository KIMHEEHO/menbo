import { getWeeklySummary } from "@/data-access/getWeeklySummary";
import GitHubActivityCard from "@/components/report/GitHubActivityCard";
import { getSession } from "@/lib/session";
import { getWeeklyData } from "@/service/github/fetch/weekly";
import { getIsoDate, getWeekRange } from "@/utils/getWeekRange";
import WeeklyActivityChart from "@/components/report/weekly/WeeklyChart";
import { WeeklyTimeline } from "@/components/report/weekly/WeeklyTimeline";
import { AiInsight } from "@/components/report/AiInsight";
import { AnalysisResult } from "@/types/monthlySummaryVO";

export default async function weeklyReport() {
  const { start, end } = getWeekRange(-1);
  const startIso = getIsoDate(start, false);
  const endIso = getIsoDate(end, true);
  const session = await getSession();
  // 주간 활동, 차트, 커밋 데이터
  const weeklyData = await getWeeklyData(session.accessToken, startIso, endIso);
  // 주간 분석 데이터
  const weeklyAnalysis = await getWeeklySummary(session.githubLogin, startIso);

  const cards = [
    {
      title: "Commit",
      count: weeklyData.summary.totalCommitContributions,
    },
    {
      title: "Pull Request",
      count: weeklyData.summary.totalPullRequestContributions,
    },
    {
      title: "Issue",
      count: weeklyData.summary.totalIssueContributions,
    },
    {
      title: "Repository",
      count: weeklyData.summary.totalRepositoryContributions,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] ">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          📊 나의 주간 활동 분석
        </h1>
        <p className="text-muted-foreground text-sm">
          날짜 컴포넌트 들어갈 자리
        </p>
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
          <div className="flex gap-3 text-xs">
            <span className="text-orange-500">● 커밋 수</span>
            <span className="text-green-500">● 변경 파일 수</span>
          </div>
          <div className="h-37.5">
            <WeeklyActivityChart chart={weeklyData.chart} />
          </div>
        </div>

        <div className="col-span-5 rounded-xl border bg-card text-card-foreground p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            주간 GitHub 커밋 타임라인
          </h1>
          <div className="space-y-3">
            <WeeklyTimeline commits={weeklyData.commits} />
          </div>
        </div>

        <div className="col-span-5 rounded-xl border bg-white p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            멘보의 한마디
          </h1>
          <AiInsight
            analysis={weeklyAnalysis?.analysis as AnalysisResult | undefined}
          />
        </div>
      </div>
    </div>
  );
}
