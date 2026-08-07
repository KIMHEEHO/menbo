import { openai } from "@/lib/openai";

export async function askAI<T>(input: string): Promise<T> {
  const response = await openai.responses.create({
    model: "gpt-5-mini",
    input,
  });
  return JSON.parse(response.output_text) as T;
}
