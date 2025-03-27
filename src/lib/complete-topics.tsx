"use server";

import { Client } from "@notionhq/client";
import { CompletedTopic } from "@/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_ID!;

export async function saveCompletedTopic(topic: string, completedAt: string) {
  try {
    const res = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Topic: {
          title: [{ text: { content: topic } }],
        },
        CompletedAt: {
          date: { start: completedAt },
        },
      },
    });
    return {
      id: res.id,
      topic: topic,
      completedAt,
    };
  } catch (e) {
    console.error("保存エラー:", e);
    return null;
  }
}

/*
 * 完了したお題を削除（アーカイブ）
 */
export async function deleteCompletedTopic(id: string) {
  try {
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
  } catch (error) {
    console.error("Notion削除エラー:", error);
  }
}

/*
 * 完了したお題を取得
 */
export async function fetchCompletedTopics(): Promise<CompletedTopic[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID!,
    filter: {
      property: "Topic",
      title: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: "CompletedAt",
        direction: "descending",
      },
    ],
    page_size: 100,
  });

  /*
   * 完了したお題のデータを取得して、画面に表示するためのデータに変換
   */
  return response.results.map((page) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageData = page as any;
    const topicProp = pageData.properties.Topic;
    const dateProp = pageData.properties.CompletedAt;

    return {
      id: pageData.id,
      topic: topicProp?.title?.[0]?.plain_text ?? "（お題なし）",
      completedAt: dateProp?.date?.start ?? "",
    };
  });
}
