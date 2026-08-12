import { getUserInfo } from "@/actions/getUserInfo";
import { ChatMessageScroller } from "@/components/chat/MessageScroller";
import { getSession } from "@/lib/session";
import { MessageList } from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import ChatEmpty from "@/components/chat/ChatEmpty";
import { Message } from "@/types/message";

const messages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "오늘 하루는 어땠나요?",
    createdAt: "2026-08-09T08:30:00",
  },
  {
    id: "2",
    role: "user",
    content: "궁금하냐?",
    createdAt: "2026-08-09T08:31:00",
  },
  {
    id: "3",
    role: "assistant",
    content: "ㅇㅇ ㄱㄱ",
    createdAt: "2026-08-09T08:30:00",
  },
  {
    id: "4",
    role: "user",
    content: "오늘 채팅 만듦 ㅋㅋ 개재밌네 ㅋㅋ ",
    createdAt: "2026-08-09T08:31:00",
  },
  {
    id: "5",
    role: "assistant",
    content: "오 지리는데",
    createdAt: "2026-08-09T08:30:00",
  },
  {
    id: "6",
    role: "user",
    content: "이제 진짜 AI 붙이러 간다 ㅋㅋㅋㅋ",
    createdAt: "2026-08-09T08:31:00",
  },
];

export default async function aiChat() {
  const session = await getSession();
  const user = await getUserInfo(session.userId);
  if (!user) {
    return null;
  }
  return (
    <>
      <main className="flex-1 overflow-hidden p-0">
        <ChatMessageScroller
          messages={
            messages.length > 0 ? (
              <MessageList
                messages={messages}
                userInfo={{
                  avatarUrl: user.avatarUrl || "",
                  userName: user.userName,
                }}
              />
            ) : (
              <ChatEmpty userName={user.userName || ""} />
            )
          }
          input={<ChatInput />}
        />
      </main>
    </>
  );
}
