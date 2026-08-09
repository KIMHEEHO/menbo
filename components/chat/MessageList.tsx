import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import { GitHubAvatar } from "../common/GitHubAvatar";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type UserInfo = {
  userName: string;
  avatarUrl: string;
};

export function MessageList(props: {
  messages: Message[];
  userInfo: UserInfo;
}) {
  const { messages, userInfo } = props;
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8">
      {messages.map((message) => (
        <Message
          key={message.id}
          align={message.role === "user" ? "end" : "start"}
        >
          <MessageAvatar>
            <GitHubAvatar
              avatarUrl={message.role === "user" ? userInfo.avatarUrl : ""}
              name={message.role === "user" ? userInfo.userName : "멘보"}
            />
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>
              {message.role === "user" ? userInfo.userName : "멘보"}
            </MessageHeader>
            <Bubble variant={message.role !== "user" ? "muted" : undefined}>
              <BubbleContent>{message.content}</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      ))}
    </div>
  );
}
