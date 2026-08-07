import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type WeeklyTimelineProps = {
  commits: {
    messageHeadline: string;
    committedDate: string;
    url: string;
  }[];
};

export function WeeklyTimeline(props: WeeklyTimelineProps) {
  const timelineItems = props.commits;
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        {timelineItems.map((commit) => (
          <React.Fragment key={commit.url}>
            <div className="text-sm">{commit.messageHeadline}</div>
            <div className="text-xs text-muted-foreground">
              {new Date(commit.committedDate).toLocaleString()}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
