import { Card, CardContent, CardFooter } from "@/components/ui/";
import { TopicCompleteModal } from "./TopicCompleteModal";
import { AnimatePresence, motion } from "framer-motion";

interface TopicCardProps {
  topic: string;
  doneMap: Record<string, boolean>;
  openDialog: string | null;
  setOpenDialog: (open: string | null) => void;
  handleComplete: (topic: string) => void;
}

const TopicCard = ({
  topic,
  openDialog,
  setOpenDialog,
  handleComplete,
}: TopicCardProps) => {
  return (
    <Card className="overflow-hidden gap-y-4 pt-6">
      <CardContent>
        <p className="text-base">{topic}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <TopicCompleteModal
          topic={topic}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleComplete={handleComplete}
        />
      </CardFooter>
    </Card>
  );
};

export const AnimatedTopicCard = ({
  topic,
  doneMap,
  openDialog,
  setOpenDialog,
  handleComplete,
}: {
  topic: string;
  doneMap: Record<string, boolean>;
  openDialog: string | null;
  setOpenDialog: (open: string | null) => void;
  handleComplete: (topic: string) => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        animate={
          doneMap[topic]
            ? {
                display: "none",
              }
            : {}
        }
      >
        <TopicCard
          topic={topic}
          doneMap={doneMap}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleComplete={handleComplete}
        />
      </motion.div>
    </AnimatePresence>
  );
};
