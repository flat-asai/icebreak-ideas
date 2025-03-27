export interface CompletedTopic {
  id: string;
  topic: string;
  completedAt: string;
}

export type IndustryValue =
  | "web"
  | "food"
  | "education"
  | "medical"
  | "legal"
  | "other"
  | string;
