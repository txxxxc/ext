import { organizeDiary } from "@/features/diary";
import { prompt } from "@/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";

export async function POST(req: Request) {
  const data = await req.json();
  const { diaries } = data;
  const chat = new ChatOpenAI({
    temperature: 1,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo-1106",
  });

  const input = await prompt.format({ body: organizeDiary(diaries) });
  const result = await chat.call([input]);

  return Response.json(result.content);
}
