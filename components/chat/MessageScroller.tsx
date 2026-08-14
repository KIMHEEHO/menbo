"use client";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

interface ChatMessageScrollerProps {
  messages: React.ReactNode;
  input: React.ReactNode;
}

export function ChatMessageScroller({
  messages,
  input,
}: ChatMessageScrollerProps) {
  return (
    <MessageScrollerProvider>
      <div className="flex h-[calc(100vh-6rem)] w-full flex-col">
        <div className="flex-1 overflow-hidden">
          <MessageScroller className="h-full">
            <MessageScrollerViewport>
              <MessageScrollerContent>{messages}</MessageScrollerContent>
            </MessageScrollerViewport>

            <MessageScrollerButton />
          </MessageScroller>
        </div>

        {input}
      </div>
    </MessageScrollerProvider>
  );
}
