"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/";
import { CheckCircle, MessageCircleMore } from "lucide-react";

interface TopicCompleteModalProps {
  topic: string;
  openDialog: string | null;
  setOpenDialog: (open: string | null) => void;
  handleComplete: (topic: string) => void;
}

export const TopicCompleteModal = ({
  topic,
  openDialog,
  setOpenDialog,
  handleComplete,
}: TopicCompleteModalProps) => {
  return (
    <Dialog
      open={openDialog === topic}
      onOpenChange={(open) => setOpenDialog(open ? topic : null)}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 cursor-pointer transition-transform active:scale-95"
        >
          これにする
          <MessageCircleMore className="h-4 w-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="leading-relaxed text-center">
          <MessageCircleMore className="h-5 w-5 mx-auto mb-2" />
          今回のお題
        </DialogTitle>
        <div>
          <div className="flex justify-center flex-col items-center">
            {topic}
          </div>
          <div className="text-right mt-6">
            <Button
              onClick={() => handleComplete(topic)}
              variant="default"
              size="sm"
              className="bg-green-600 border-1 border-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-600 transition-transform active:scale-95"
            >
              <CheckCircle className="h-4 w-4" />
              完了
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
