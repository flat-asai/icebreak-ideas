"use server";

import { saveCompletedTopic } from "@/lib/complete-topics";

export async function saveCompletedTopicAction(
  text: string,
  completedAt: string,
) {
  return await saveCompletedTopic(text, completedAt);
}
