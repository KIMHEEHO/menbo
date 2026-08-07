import { CheckCircle2Icon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnalysisResult } from "@/types/weeklySummaryVO";
type AnalysisAlertProps = {
  analysis?: AnalysisResult;
};

export function AnalysisAlert({ analysis }: AnalysisAlertProps) {
  return (
    <div className="grid w-full  items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertDescription>
          {analysis?.positive_feedback ?? "피드백이 없습니다."}
        </AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2Icon />
        <AlertDescription>
          {analysis?.growth_points ?? "성장 포인트가 없습니다."}
        </AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2Icon />
        <AlertDescription>
          {analysis?.next_recommendation ?? "추천 사항이 없습니다."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
