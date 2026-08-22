import { requestGithubGraphql } from "@/service/github/api/graphql";
import { CommitNode, RepositoryCommit } from "@/types/commit";
import {
  ContributionWeek,
  ContributionDay,
} from "@/types/contributionCalendar";
import { Repository } from "@/types/monthlyActivityData";

export async function getWeeklyData(
  accessToken: string,
  start: string,
  end: string,
) {
  const query = `
    query {
        viewer {
            repositories(first: 10 orderBy: { field: PUSHED_AT, direction: DESC }) {
                nodes {
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history(
                                    first: 20
                                    since: "${start}"
                                    until: "${end}"
                                    ) {
                                    totalCount
                                    nodes {
                                        messageHeadline
                                        committedDate
                                        additions
                                        deletions
                                        changedFilesIfAvailable
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
            contributionsCollection(
                from: "${start}"
                to: "${end}"
            ) {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                totalRepositoryContributions
                contributionCalendar {
                    weeks {
                        firstDay
                        contributionDays {
                            date
                            contributionCount
                        }
                    }
                }
            }
        }
    }`;

  const response = await requestGithubGraphql(accessToken, query);

  const weeklySummary = response.data.viewer.contributionsCollection;

  const weeklyCalendar = weeklySummary.contributionCalendar.weeks
    .flatMap((week: ContributionWeek) => week.contributionDays)
    .filter((day: ContributionDay) => day.date >= start && day.date <= end);

  const projects = response.data.viewer.repositories.nodes.filter(
    (repo: Repository) => {
      return (repo.defaultBranchRef?.target?.history?.totalCount ?? 0) > 0;
    },
  );

  const weeklyCommits = response.data.viewer.repositories.nodes
    .flatMap(
      (repo: RepositoryCommit) =>
        repo.defaultBranchRef?.target?.history?.nodes ?? [],
    )
    .sort(
      (a: CommitNode, b: CommitNode) =>
        new Date(b.committedDate).getTime() -
        new Date(a.committedDate).getTime(),
    );

  const changedFilesByDate = weeklyCommits.reduce(
    (acc: Record<string, number>, commit: CommitNode) => {
      const date = commit.committedDate.slice(0, 10);

      acc[date] = (acc[date] ?? 0) + (commit.changedFilesIfAvailable ?? 0);

      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = weeklyCalendar.map((day: ContributionDay) => ({
    date: day.date,
    contributionCount: day.contributionCount,
    changedFiles: changedFilesByDate[day.date] ?? 0,
  }));

  return {
    summary: weeklySummary,
    repo: projects,
    chart: chartData,
    commits: weeklyCommits,
  };
}
