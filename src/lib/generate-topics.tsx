"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { CompletedTopic } from "@/types";

/**
 * お題の生成をコントロールするためのインターフェース
 */
interface GenerateTopicsProps {
  industry: string;
  includeCasual: boolean;
  count: number;
  previousTopics?: string[];
  excludedTopics?: CompletedTopic[];
}

export async function generateTopics({
  industry,
  includeCasual,
  count,
  previousTopics,
  excludedTopics,
}: GenerateTopicsProps): Promise<string[]> {
  /*
   * お題のプロンプト
   */
  const prompt = `
あなたは会社のアイスブレイクのためのお題を考えるエキスパートです。
以下の条件に基づいて、アイスブレイクに最適なお題を${count}個生成してください。

【業種】${industry}

${
  includeCasual
    ? "業界に関連するお題と、業務に関係ない日常的な雑談のお題を5:5の割合で混ぜてください。"
    : "業界に関連するお題を中心に考えてください。"
}

- 各お題は1〜2文の短い質問形式にしてください
- 答えやすく、会話が広がりやすいお題を考えてください
- 個人的すぎる内容や、センシティブな話題は避けてください
- 業界の専門知識がなくても答えられる内容にしてください
- 再回答時は、連続して直前に出題されたお題が重複しないようにしてください
- お題のみで回答してください。お題：などは不要です。

以下、例文です。
リモートワークを助ける新しいツールを発明するとしたら、それはどんなもの？
チームとして最も誇りに思っていることは？
最近読んだ本を1冊教えて？

お題のみをリストで出力してください。番号や箇条書き記号は不要です。

以下に記載のあるお題は除外してください。
除外するお題：
${previousTopics && previousTopics.length > 0 ? previousTopics.join("、") : ""}

${
  excludedTopics && excludedTopics.length > 0
    ? excludedTopics.map((topic) => topic.topic).join("、")
    : ""
}
`;

  /*
   * モデルの呼び出し
   */
  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt,
  });

  /*
   * お題の分割
   */
  const topics = text
    .split("\n") // 改行で分割（1行1お題）
    .map((line) => line.trim()) // 空白削除
    .filter((line) => line.length > 0) // 空行は除外
    .slice(0, count); // 念のため count 件に絞る

  console.log(prompt);
  return topics;
}
