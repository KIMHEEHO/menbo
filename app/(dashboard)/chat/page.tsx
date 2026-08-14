import { getSession } from "@/lib/session";
import { getUserInfo } from "@/actions/getUserInfo";
import { ChatClient } from "@/components/chat/ChatClient";
import { getMessages } from "@/data-access/getMessages";

export default async function AiChat() {
  const session = await getSession();
  const user = await getUserInfo(session.userId);

  if (!user) return null;

  const messages = await getMessages(session.userId);

  return (
    <ChatClient
      initialMessages={messages}
      userInfo={{
        avatarUrl: user.avatarUrl || "",
        userName: user.userName,
      }}
    />
  );
}
