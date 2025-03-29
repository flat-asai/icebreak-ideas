// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { generateTopics } from "@/lib/generate-topics";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Heading,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/";
import { CheckCircle, MessageCircleMore, MessageCircleOff } from "lucide-react";
import { fetchCompletedTopics, unCompleteTopic } from "@/lib/complete-topics";
import { saveCompletedTopicAction } from "@/actions/save-completed-topic";
import { CompletedTopic, IndustryValue } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnimatedTopicCard,
  TopicGenerator,
} from "@/app/_feature/topic-generator";

export default function Home() {
  const INDUSTRY_PRESETS = [
    { value: "web", label: "Web・IT系" },
    { value: "food", label: "飲食・カフェ系" },
    { value: "education", label: "教育・塾系" },
    { value: "medical", label: "医療・クリニック系" },
    { value: "legal", label: "法律・司法書士系" },
    { value: "other", label: "その他（自由入力）" },
  ];

  const INDUSTRY_MAP: Record<IndustryValue, string> = {
    web: "Webサイト制作、フロントエンド開発、Webアプリ開発",
    food: "飲食店、カフェ、テイクアウトサービス",
    education: "学校、オンライン学習、塾・予備校",
    medical: "病院、クリニック、ヘルスケアサービス",
    legal: "法律事務所、司法書士事務所、行政書士事務所",
  };

  const COUNT_PRESETS = [
    { value: 1, label: "1つ" },
    { value: 2, label: "2つ" },
    { value: 3, label: "3つ" },
    { value: 4, label: "4つ" },
    { value: 5, label: "5つ" },
  ];

  /* 業態 */
  const [industry, setIndustry] = useState(INDUSTRY_PRESETS[0].value);
  const [isCustom, setIsCustom] = useState(false);

  /* お題の生成 */
  const [includeCasual, setIncludeCasual] = useState(false);
  const [count, setCount] = useState(1);
  const [topics, setTopics] = useState<string[]>([]);

  /* 完了 */
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  const [excludeCompleted, setExcludeCompleted] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<CompletedTopic[]>([]);

  /* 前回のお題 */
  const [previousTopics, setPreviousTopics] = useState<string[]>([]);

  /* ローディング */
  const [loading, setLoading] = useState(false);

  /* ダイアログ */
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);

    let excludedTopics: CompletedTopic[] = [];

    if (excludeCompleted) {
      excludedTopics = await fetchCompletedTopics();
    }

    const result = await generateTopics({
      industry: selectedIndustry,
      includeCasual,
      count: count,
      excludedTopics: excludedTopics,
      previousTopics: previousTopics,
    });

    setTopics(result);
    setPreviousTopics((prev) => [...prev, ...result]);

    setLoading(false);
  };

  const handleComplete = async (topic: string) => {
    setOpenDialog(null);
    setDoneMap((prev) => ({ ...prev, [topic]: true }));

    const now = new Date().toISOString();
    const saved = await saveCompletedTopicAction(topic, now);

    if (saved) {
      setCompletedTopics((prev) => [saved, ...prev]);
    }

    setTopics((prev) => prev.filter((t) => t !== topic));
    setPreviousTopics((prev) => prev.filter((t) => t !== topic));

    setDoneMap((prev) => ({ ...prev, [topic]: false }));
  };

  const handleUnComplete = async (id: string) => {
    await unCompleteTopic(id);
    setCompletedTopics((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchCompletedTopics();
      setCompletedTopics(topics);
    };

    fetchData();
  }, []);

  const selectedIndustry = INDUSTRY_MAP[industry] || industry;

  return (
    <main className="py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">
          アイスブレイク提案ツール
        </h1>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="generate">お題をつくる</TabsTrigger>
            <TabsTrigger value="completed">完了したお題</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <div className="space-y-10">
              <TopicGenerator
                industry={industry}
                setIndustry={setIndustry}
                isCustom={isCustom}
                setIsCustom={setIsCustom}
                includeCasual={includeCasual}
                setIncludeCasual={setIncludeCasual}
                count={count}
                setCount={setCount}
                excludeCompleted={excludeCompleted}
                setExcludeCompleted={setExcludeCompleted}
                handleGenerate={handleGenerate}
                loading={loading}
                INDUSTRY_PRESETS={INDUSTRY_PRESETS}
                COUNT_PRESETS={COUNT_PRESETS}
              />
              <div className="space-y-8">
                <Heading>こんなお題はいかが？</Heading>
                {topics.length > 0 ? (
                  <>
                    {topics.map((topic, index) => (
                      <AnimatedTopicCard
                        key={index}
                        topic={topic}
                        doneMap={doneMap}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        handleComplete={handleComplete}
                      />
                    ))}
                  </>
                ) : (
                  <p className="text-center">
                    <MessageCircleMore className="h-5 w-5 mx-auto mb-2" />
                    ここにお題が表示されます
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            {completedTopics.length > 0 ? (
              <div className="pt-6 space-y-8">
                <Heading>これまでのお題一覧</Heading>
                {completedTopics.map((topic, index) => (
                  <AnimatePresence key={index}>
                    <motion.div
                      animate={
                        doneMap[topic.id]
                          ? {
                              display: "none",
                              transition: { delay: 0.5 },
                            }
                          : {}
                      }
                    >
                      <Card
                        key={index}
                        className="overflow-hidden gap-y-4 pt-6"
                      >
                        <CardContent>
                          <p className="text-base">{topic.topic}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            animate={
                              doneMap[topic.id]
                                ? {
                                    scale: [1, 1.1, 1],
                                    transition: { duration: 0.3 },
                                  }
                                : {}
                            }
                          >
                            <Button
                              onClick={() => handleUnComplete(topic.id)}
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
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <div className="pt-10 space-y-8">
                <p className="text-center">
                  <MessageCircleOff className="h-5 w-5 mx-auto mb-2" />
                  完了したお題はまだありません
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
