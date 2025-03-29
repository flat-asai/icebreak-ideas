"use client";

import { Button, Card, CardContent, CardFooter } from "@/components/ui/";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CompletedTopicsProps {
  topic: string;
  doneMap: Record<string, boolean>;
  handleUnComplete: (id: string) => void;
}

const CompletedTopics = ({
  topic,
  doneMap,
  handleUnComplete,
}: CompletedTopicsProps) => {
  return (
    <Card className="overflow-hidden gap-y-4 pt-6">
      <CardContent>
        <p className="text-base">{topic}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <motion.div
          whileTap={{ scale: 0.95 }}
          animate={
            doneMap[topic]
              ? {
                  scale: [1, 1.1, 1],
                  transition: { duration: 0.3 },
                }
              : {}
          }
        >
          <Button
            onClick={() => handleUnComplete(topic)}
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            未完了に戻す
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export const AnimatedCompletedTopics = ({
  topic,
  doneMap,
  handleUnComplete,
}: CompletedTopicsProps) => {
  return (
    <AnimatePresence>
      <motion.div
        animate={
          doneMap[topic]
            ? {
                display: "none",
                transition: { delay: 0.5 },
              }
            : {}
        }
      >
        <CompletedTopics
          topic={topic}
          doneMap={doneMap}
          handleUnComplete={handleUnComplete}
        />
      </motion.div>
    </AnimatePresence>
  );
};
