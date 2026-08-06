import { getWeeklySummary } from "@/data-access/getWeeklySummary";
import GitHubActivityCard from "@/components/report/GitHubActivityCard";
import { getSession } from "@/lib/session";
import { getWeeklyData } from "@/service/github/fetch/weekly";
import { getIsoDate, getWeekRange } from "@/utils/getWeekRange";
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
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* 상단 날짜 타이틀 영역 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          📊 나의 주간 활동 분석
        </h1>
        <p className="text-muted-foreground text-sm">
          날짜 컴포넌트 들어갈 자리
        </p>
      </div>

      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground p-6 shadow-sm grid grid-cols-2 gap-4">
          {cards.map((card) => (
            <GitHubActivityCard
              key={card.title}
              title={card.title}
              count={card.count}
            />
          ))}
        </div>

        <div className="col-span-6 rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
          <h3 className="font-semibold mb-4">주간 기여도 그래프</h3>
          {weeklyData.calendar.map(
            (day: { date: string; contributionCount: number }) => (
              <div key={day.date} className="text-sm">
                {day.date}: {day.contributionCount}
              </div>
            ),
          )}
        </div>

        <div className="col-span-10 rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
          <h3 className="font-semibold mb-4">최근 커밋 타임라인</h3>
          <div className="space-y-3">
            {weeklyData.commits.map(
              (commit: {
                messageHeadline: string;
                committedDate: string;
                url: string;
              }) => (
                <div key={commit.url} className="border-b pb-2 last:border-0">
                  <p className="font-medium">{commit.messageHeadline}</p>
                  <p className="text-xs text-muted-foreground">
                    Committed Date: {commit.committedDate}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="col-span-10 rounded-xl border bg-muted/50 p-6 shadow-sm">
          <h3 className="font-semibold mb-2">💡 AI 주간 인사이트</h3>
          <p className="text-sm leading-relaxed">
            {weeklyAnalysis?.analysis || "No analysis available"}
          </p>
        </div>
      </div>
    </div>
  );
}
