import { Message } from "@/types/message";
import { getSession } from "@/lib/session";
import { getWeeklySummary } from "@/data-access/getWeeklySummary";
import { getMonthlySummary } from "@/data-access/getMonthlySummary";
import { createChatMessage } from "@/service/openai/chatMessage";
import { getWeekRange } from "@/utils/getWeekRange";
import { saveMessage } from "@/data-access/saveMessages";
import { getMessages } from "@/data-access/getMessages";

export async function syncAiChat(message: string) {
  const session = await getSession();
  const week = getWeekRange(-1);
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}`;

  //데이터베이스에 저장
  await saveMessage("USER", message);
  
  // 주간 활동 분석 결과 가져오기
  const weeklySummary = await getWeeklySummary(session.githubLogin, week.start);
  if (!weeklySummary) {
    throw new Error("주간 분석 리포트가 없습니다.");
  }

  // 월간 활동 분석 결과 가져오기
  const monthlySummary = await getMonthlySummary(session.githubLogin, month);
  if (!monthlySummary) {
    throw new Error("월간 분석 리포트가 없습니다.");
  }

  // 최근 대화 기록 가져오기
  const messages: Message[] = await getMessages(session.userId);

  // AI 챗 메시지 생성
  const aiMessage = await createChatMessage(
    weeklySummary.commits,
    weeklySummary.analysis,
    monthlySummary.summary,
    monthlySummary.analysis,
    monthlySummary.growthPoint,
    messages,
  );

  // AI 챗 메시지 저장
  await saveMessage("ASSISTANT", aiMessage.message);

  return aiMessage.message;
}
