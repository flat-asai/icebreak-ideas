"use server";

import { saveCompletedTopic } from "@/lib/complete-topics";

export async function saveCompletedTopicAction(
  text: string,
  completedAt: string,
) {
  await saveCompletedTopic(text, completedAt);
}
