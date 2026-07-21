import { NextRequest, NextResponse } from "next/server";
import { askAI } from "@/service/openai/client";

export async function POST(request: NextRequest) {
  const { input } = await request.json();

  if (!input) {
    return NextResponse.json({ error: "Input is required" }, { status: 400 });
  }

  try {
    const answer = await askAI(input);

    return NextResponse.json({
      response: answer,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to get AI response",
      },
      {
        status: 500,
      },
    );
  }
}
