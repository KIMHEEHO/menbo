import { requestGithubGraphql } from "../api/graphql";
import {
  ContributionDay,
  ContributionWeek,
} from "@/types/contributionCalendar";

export async function getContributionCalendar(
  accessToken: string,
  start: string,
  end: string,
) {
  const query = `
    query {
        viewer {
            contributionsCollection(
                from: "${start}"
                to: "${end}"
            ) {
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

  const calendar =
    response.data.viewer.contributionsCollection.contributionCalendar;

  const contributionDays = calendar.weeks
    .flatMap((week: ContributionWeek) => week.contributionDays)
    .filter((day: ContributionDay) => day.date >= start && day.date <= end);

  return contributionDays;
}
