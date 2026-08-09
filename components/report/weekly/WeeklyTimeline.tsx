import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GitCommitHorizontal } from "lucide-react";

type WeeklyTimelineProps = {
  commits: {
    messageHeadline: string;
    committedDate: string;
    url: string;
    additions: number;
    deletions: number;
    changedFilesIfAvailable: number;
  }[];
};

export function WeeklyTimeline(props: WeeklyTimelineProps) {
  return (
    <ScrollArea className="h-full w-full rounded-md border">
      <div className="relative p-4">
        {/* 세로선 */}
        <div className="absolute left-8 top-4 bottom-4 w-px bg-gray-300" />

        {props.commits.map((commit) => (
          <div key={commit.url} className="relative flex gap-2 pb-4">
            {/* 아이콘 */}
            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              <GitCommitHorizontal className="h-4 w-4" />
            </div>

            {/* 내용 */}
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                {new Date(commit.committedDate).toLocaleString()}
              </p>

              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-semibold text-black hover:text-green-600 hover:underline"
              >
                {commit.messageHeadline}
              </a>

              <p className="text-xs text-muted-foreground mt-1">
                📄 {commit.changedFilesIfAvailable} files ·
                <span className="text-green-600 ml-1">+{commit.additions}</span>
                <span className="text-red-500 ml-1">-{commit.deletions}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
