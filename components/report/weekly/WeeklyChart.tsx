"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type WeeklyActivityChartProps = {
  chart:
    | {
        date: string;
        contributionCount: number;
        changedFiles: number;
      }[]
    | null;
};

export default function WeeklyActivityChart(props: WeeklyActivityChartProps) {
  const chartData = props?.chart?.map(
    (day: {
      date: string;
      contributionCount: number;
      changedFiles: number;
    }) => ({
      date: day.date,
      commit_count: day.contributionCount,
      change_files: day.changedFiles,
    }),
  );

  return (
    <>
      <div className="flex gap-3 text-xs">
        <span className="text-orange-500">● 커밋 수</span>
        <span className="text-green-500">● 변경 파일 수</span>
      </div>
      <LineChart
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: 1.618,
        }}
        responsive
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

        <XAxis dataKey="date" stroke="#666" />
        <YAxis yAxisId="left" width="auto" stroke="#666" />
        <YAxis
          yAxisId="right"
          orientation="right"
          width="auto"
          stroke="#22C55E"
        />
        <Tooltip
          cursor={{
            stroke: "var(--color-border-2)",
          }}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "12px",
          }}
        />
        <Line
          type="monotone"
          dataKey="commit_count"
          yAxisId="left"
          name="커밋 수"
          stroke="#F59E0B"
          dot={{
            fill: "var(--color-surface-base)",
          }}
          activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
        />
        <Line
          type="monotone"
          dataKey="change_files"
          yAxisId="right"
          name="변경 파일 수"
          stroke="#22C55E"
          dot={{
            fill: "var(--color-surface-base)",
          }}
          activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
        />
      </LineChart>
    </>
  );
}
