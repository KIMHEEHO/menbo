"use client";

import { useState } from "react";
import { ChatMessageScroller } from "./MessageScroller";
import { MessageList } from "./MessageList";
import ChatInput from "./ChatInput";
import ChatEmpty from "./ChatEmpty";
import { Message } from "@/types/message";

export interface ChatProps {
  initialMessages: Message[];
  userInfo: {
    avatarUrl?: string;
    userName: string;
  };
}
export function ChatClient({ initialMessages, userInfo }: ChatProps) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <>
      <main className="flex-1 overflow-hidden p-0">
        <ChatMessageScroller
          messages={
            messages.length > 0 ? (
              <MessageList
                messages={messages}
                userInfo={{
                  avatarUrl: userInfo.avatarUrl || "",
                  userName: userInfo.userName,
                }}
              />
            ) : (
              <ChatEmpty userName={userInfo.userName || ""} />
            )
          }
          input={<ChatInput />}
        />
      </main>
    </>
  );
}
