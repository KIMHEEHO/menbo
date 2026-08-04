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
    <>
      <h1>날짜 컴포넌트 예정 </h1>
      <div className="grid grid-cols-10 gap-4 ml-10 mr-10">
        <div className="col-span-4 rounded-xl border p-4 grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <GitHubActivityCard
              key={card.title}
              title={card.title}
              count={card.count}
            />
          ))}
        </div>
        <div className="col-span-6 rounded-xl border p-4">
          {" "}
          {weeklyData.calendar.map(
            (day: { date: string; contributionCount: number }) => (
              <div key={day.date}>
                {day.date}: {day.contributionCount}
              </div>
            ),
          )}
        </div>
      </div>
      <div className="grid grid-cols-10 gap-4 ml-10 mr-10 mt-10">
        <div className="col-span-10 rounded-xl border p-4">
          {weeklyData.commits.map(
            (commit: {
              messageHeadline: string;
              committedDate: string;
              url: string;
            }) => (
              <div key={commit.url}>
                {commit.messageHeadline}
                <div>Committed Date: {commit.committedDate}</div>
              </div>
            ),
          )}
        </div>
        <div className="col-span-10 rounded-xl border p-4 ">
          {weeklyAnalysis?.analysis || "No analysis available"}
        </div>
      </div>
    </>
  );
}
