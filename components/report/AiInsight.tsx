import { CirclePlus, MessageCircleHeart, Sprout } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Analysis } from "@/types/analysis";
type AiInsightProps = {
  analysis?: Analysis;
};

export function AiInsight({ analysis }: AiInsightProps) {
  return (
    <div className="grid gap-2">
      <Alert className="bg-pink-50 border-pink-100">
        <AlertDescription className="text-black">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <MessageCircleHeart className="text-pink-500" />
              이번주 칭찬
            </h3>
            <p>{analysis?.positive_feedback ?? "이번주 칭찬이 없습니다."}</p>
          </div>
        </AlertDescription>
      </Alert>
      <Alert className="bg-green-50 border-green-100">
        <AlertDescription className="text-black">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Sprout className="text-green-500" />
              성장 포인트
            </h3>
            <p>{analysis?.growth_points ?? "성장 포인트가 없습니다."}</p>
          </div>
        </AlertDescription>
      </Alert>
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-black">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <CirclePlus className="text-blue-500" />
              다음주 추천 사항
            </h3>
            <p>{analysis?.next_recommendation ?? "추천 사항이 없습니다."}</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
