import { CommitNode } from "@/types/commit";
import { DiaryPrompt } from "../prompt/diaryPrompt";
import { askAI } from "@/service/openai/client";

export async function writeDiary(
  commits: CommitNode[],
): Promise<{ title: string; content: string }> {
  const prompt = DiaryPrompt(commits);

  return await askAI(prompt);
}
