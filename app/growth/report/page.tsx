import GitHubActivityCard from "@/components/report/GitHubActivityCard";
import { getSession } from "@/lib/session";
import { getMonthlyData } from "@/service/github/fetch/monthly";
import { getMonthlyAnalysis } from "@/data-access/getMonthlyAnalysis";
import { Repository } from "@/types/monthlyActivityData";
import { AnalysisResult } from "@/types/weeklySummaryVO";
import { AnalysisAlert } from "@/components/report/AnalysisAlert";
export default async function growthReport() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;

  const session = await getSession();
  // 주간 활동, 차트, 커밋 데이터
  const monthlyData = await getMonthlyData(session.accessToken, month);
  // 주간 분석 데이터
  const monthlyAnalysis = await getMonthlyAnalysis(session.githubLogin, month);
  const cards = [
    {
      title: "Commit",
      count: monthlyData.summary.totalCommitContributions,
    },
    {
      title: "Pull Request",
      count: monthlyData.summary.totalPullRequestContributions,
    },
    {
      title: "Issue",
      count: monthlyData.summary.totalIssueContributions,
    },
    {
      title: "Repository",
      count: monthlyData.repo.length,
    },
  ];
  return (
    // <div className="w-full px-8 py-8">
    <div className="mx-auto w-full max-w-[1600px] px-6 py-8">
      {/* 상단 날짜 타이틀 영역 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          📊 나의 월간 활동 분석
        </h1>
        <p className="text-muted-foreground text-sm">
          날짜 컴포넌트 들어갈 자리
        </p>
      </div>

      <div className="grid grid-cols-10 gap-6">
        {/* <div className="col-span-4 rounded-xl border bg-card text-card-foreground p-6 shadow-sm grid grid-cols-2 gap-4"> */}
        <div className="col-span-4 grid grid-cols-2 gap-4 bg-white rounded-xl border p-6 shadow-sm">
          {cards.map((card) => (
            <GitHubActivityCard
              key={card.title}
              title={card.title}
              count={card.count}
            />
          ))}
        </div>

        {/* <div className="col-span-6 rounded-xl border text-card-foreground p-6 shadow-sm bg-white"> */}
        <div className="col-span-6 grid grid-cols-2 gap-4 bg-white rounded-xl border p-6 shadow-sm">
          {monthlyData.repo.map((repo: Repository) => (
            <div
              key={repo.name}
              className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm"
            >
              <h3 className="font-semibold mb-4">{repo.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {repo.description}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Primary Language: {repo.primaryLanguage?.name ?? "N/A"}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Stars: {repo.stargazerCount}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Last Pushed: {new Date(repo.pushedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="col-span-10 rounded-xl border bg-card text-card-foreground p-6 shadow-sm">
          <AnalysisAlert
            analysis={monthlyAnalysis?.analysis as AnalysisResult | undefined}
          />
        </div>

        <div className="col-span-10 rounded-xl border bg-muted/50 p-6 shadow-sm">
          {monthlyAnalysis?.growthPoint.growth_points}
          {monthlyAnalysis?.growthPoint.positive_feedback}
          {monthlyAnalysis?.growthPoint.next_recommendation}
        </div>
      </div>
    </div>
  );
}
