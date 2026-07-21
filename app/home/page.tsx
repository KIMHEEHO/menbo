"use client";
import { useState } from "react";
export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const askAIButton = async () => {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: "안녕",
      }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <>
      <h1>하이~~</h1>
      <button onClick={askAIButton}>Ask AI</button>
      <h1>response: {response}</h1>
    </>
  );
}
