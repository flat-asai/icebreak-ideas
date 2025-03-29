"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/";
import { TopicCompleteModal } from "./TopicCompleteModal";
import { AnimatePresence, motion } from "framer-motion";

interface TopicCardProps {
  topicState: {
    topic: string;
    doneMap: Record<string, boolean>;
  };

  dialogState: {
    openDialog: string | null;
    setOpenDialog: (open: string | null) => void;
  };

  handleComplete: (topic: string) => void;
}

const TopicCard = ({
  topicState,
  dialogState,
  handleComplete,
}: TopicCardProps) => {
  return (
    <Card className="overflow-hidden gap-y-4 pt-6">
      <CardContent>
        <p className="text-base">{topicState.topic}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <TopicCompleteModal
          topic={topicState.topic}
          openDialog={dialogState.openDialog}
          setOpenDialog={dialogState.setOpenDialog}
          handleComplete={handleComplete}
        />
      </CardFooter>
    </Card>
  );
};

export const AnimatedTopicCard = ({
  topicState,
  dialogState,
  handleComplete,
}: {
  topicState: {
    topic: string;
    doneMap: Record<string, boolean>;
  };

  dialogState: {
    openDialog: string | null;
    setOpenDialog: (open: string | null) => void;
  };

  handleComplete: (topic: string) => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        animate={
          topicState.doneMap[topicState.topic]
            ? {
                display: "none",
              }
            : {}
        }
      >
        <TopicCard
          topicState={topicState}
          dialogState={dialogState}
          handleComplete={handleComplete}
        />
      </motion.div>
    </AnimatePresence>
  );
};
