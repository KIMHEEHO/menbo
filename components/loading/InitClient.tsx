"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Circle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  checkLoginAction,
  syncUserAction,
  syncEventsAction,
  syncWeeklySummaryAction,
  syncMonthlySummaryAction,
} from "@/actions/syncGithubActivity";

interface InitClientProps {
  githubLogin: string;
}

const STEPS = [
  { message: "GitHub 로그인 중", run: checkLoginAction },
  { message: "사용자 정보를 가져오는 중", run: syncUserAction },
  { message: "GitHub 활동 데이터를 가져오는 중", run: syncEventsAction },
  { message: "주간 AI 분석을 요청하는 중", run: syncWeeklySummaryAction },
  { message: "월간 AI 분석을 요청하는 중", run: syncMonthlySummaryAction },
];

export default function InitClient({ githubLogin }: InitClientProps) {
  // 현재 진행 중인 단계 index (STEPS.length면 완료)
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // StrictMode에서 effect가 두 번 실행되어 중복 요청되는 것을 방지
  const startedRef = useRef(false);

  const runSteps = async (from: number) => {
    setError(null);

    for (let i = from; i < STEPS.length; i++) {
      setStep(i);
      try {
        const result = await STEPS[i].run();

        // 로그인 확인 실패 시 랜딩으로 이동
        if (result === false) {
          router.replace("/");
          return;
        }
      } catch {
        setError(`${STEPS[i].message} 문제가 발생했습니다.`);
        return;
      }
    }

    setStep(STEPS.length);
    router.replace("/home");
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    runSteps(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDone = step >= STEPS.length;
  const progress = Math.round((step / STEPS.length) * 100);
  const currentMessage = isDone ? "완료! 홈으로 이동합니다" : STEPS[step].message;

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1">
          {githubLogin ? `${githubLogin}님, 환영해요` : "초기화 중"}
        </h1>
        <p className="text-muted-foreground mb-6">
          처음 접속 시 분석에 시간이 조금 걸릴 수 있어요.
        </p>

        <div className="flex justify-between text-sm mb-2">
          <span className={error ? "text-destructive" : ""}>
            {error ?? `${currentMessage}...`}
          </span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              error ? "bg-destructive" : "bg-primary"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="mt-6 space-y-3">
          {STEPS.map((s, i) => {
            const isCurrent = i === step && !isDone;
            const isComplete = i < step;

            return (
              <li
                key={s.message}
                className={`flex items-center gap-2 text-sm ${
                  isComplete || isCurrent ? "" : "text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <Check className="size-4 text-primary" />
                ) : isCurrent && error ? (
                  <AlertCircle className="size-4 text-destructive" />
                ) : isCurrent ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Circle className="size-4" />
                )}
                {s.message}
              </li>
            );
          })}
        </ul>

        {error && (
          <Button className="mt-6 w-full" onClick={() => runSteps(step)}>
            다시 시도
          </Button>
        )}
      </div>
    </div>
  );
}
