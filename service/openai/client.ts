import { openai } from "@/lib/openai";

export async function askAI(input: string): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-5-mini",
    input,
  });

  return response.output_text;
}
