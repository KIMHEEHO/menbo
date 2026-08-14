"use client";

import { useState } from "react";

import { CardFooter } from "../ui/card";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { sendChatMessage } from "@/actions/sendChatMessage";

export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue;

    setInputValue("");

    await sendChatMessage(message);
  };

  return (
    <CardFooter className="px-6 py-5">
      <InputGroup
        className="
    mx-auto w-full max-w-3xl
    rounded-2xl
    border border-green-500
    bg-white
    shadow-sm
    transition
    focus-within:border-green-400
    focus-within:ring-2
    focus-within:ring-green-100
    
  "
      >
        <InputGroupInput
          className="h-12 border-0 bg-transparent px-4 text-sm focus-visible:ring-0"
          placeholder="멘보에게 이야기해보세요 🌱"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              handleSendMessage();
            }
          }}
        />

        <InputGroupButton
          className="mr-1.5 h-9 w-9 rounded-xl bg-green-500 p-0 text-white hover:bg-green-400"
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          ↑
        </InputGroupButton>
      </InputGroup>
    </CardFooter>
  );
}
