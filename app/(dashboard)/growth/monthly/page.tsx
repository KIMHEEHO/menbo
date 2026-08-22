import GitHubActivityCard from "@/components/report/GitHubActivityCard";
import { getSession } from "@/lib/session";
import { getMonthlyData } from "@/service/github/fetch/monthly";
import { getMonthlyAnalysis } from "@/data-access/getMonthlyAnalysis";
import { Repository } from "@/types/monthlyActivityData";
import { AiInsight } from "@/components/report/AiInsight";
import RepositoryCard from "@/components/report/monthly/RepositoryCard";
import GrowthPointSection from "@/components/report/monthly/GrowthPointSection";
import Calendar from "@/components/report/Calendar";
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
    <div className="mx-auto w-full max-w-[1600px] ">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          📊 나의 월간 활동 분석
        </h1>
        {/* <p className="text-muted-foreground text-sm">
          날짜 컴포넌트 들어갈 자리
        </p> */}
        <Calendar />
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
            {monthlyData.repo.map((repo: Repository) => (
              <RepositoryCard key={repo.name} {...repo} />
            ))}
          </div>
        </div>

        <div className="col-span-5 rounded-xl border bg-white p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            멘보의 한마디
          </h1>
          <AiInsight analysis={monthlyAnalysis?.analysis} />
        </div>

        <div className="col-span-5 rounded-xl border bg-muted/50 p-4 shadow-sm min-h-85">
          <h1 className="text-xl font-semibold mb-4 text-black">
            이번 달 개발 리뷰
          </h1>
          <GrowthPointSection review={monthlyAnalysis?.growthPoint ?? null} />
        </div>
      </div>
    </div>
  );
}
