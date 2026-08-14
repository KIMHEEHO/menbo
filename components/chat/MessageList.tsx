import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import { GitHubAvatar } from "../common/GitHubAvatar";
import { Message as MessageType } from "@/types/message";
type UserInfo = {
  userName: string;
  avatarUrl: string;
};

export function MessageList(props: {
  messages: MessageType[];
  userInfo: UserInfo;
}) {
  const { messages, userInfo } = props;
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8">
      {messages.map((message) => (
        <Message
          key={message.id}
          align={message.role === "USER" ? "end" : "start"}
        >
          <MessageAvatar>
            <GitHubAvatar
              avatarUrl={message.role === "USER" ? userInfo.avatarUrl : ""}
              name={message.role === "USER" ? userInfo.userName : "멘보"}
            />
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>
              {message.role === "USER" ? userInfo.userName : "멘보"}
            </MessageHeader>
            <Bubble variant={message.role !== "USER" ? "muted" : undefined}>
              <BubbleContent>{message.content}</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      ))}
    </div>
  );
}
