import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
} from "@/components/ui/";
import { RefreshCw } from "lucide-react";

interface TopicGeneratorProps {
  industry: string;
  setIndustry: (industry: string) => void;
  isCustom: boolean;
  setIsCustom: (isCustom: boolean) => void;
  includeCasual: boolean;
  setIncludeCasual: (includeCasual: boolean) => void;
  count: number;
  setCount: (count: number) => void;
  excludeCompleted: boolean;
  setExcludeCompleted: (excludeCompleted: boolean) => void;
  handleGenerate: () => void;
  loading: boolean;
  INDUSTRY_PRESETS: { value: string; label: string }[];
  COUNT_PRESETS: { value: number; label: string }[];
}

export const TopicGenerator = ({
  industry,
  setIndustry,
  isCustom,
  setIsCustom,
  includeCasual,
  setIncludeCasual,
  count,
  setCount,
  excludeCompleted,
  setExcludeCompleted,
  handleGenerate,
  loading,
  INDUSTRY_PRESETS,
  COUNT_PRESETS,
}: TopicGeneratorProps) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="industry">どんな仕事をしている会社？</Label>
          <Select
            value={isCustom ? "other" : industry}
            onValueChange={(value) => {
              if (value === "other") {
                setIsCustom(true);
                setIndustry("");
              } else {
                setIsCustom(false);
                setIndustry(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="業界を選んでください" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_PRESETS.map((preset) => (
                <SelectItem key={preset.value} value={preset.value}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isCustom && (
            <Input
              placeholder="例：Web制作・デザイン事業 など"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeCasual"
            checked={includeCasual}
            onCheckedChange={(checked) => setIncludeCasual(checked as boolean)}
          />
          <Label htmlFor="includeCasual">日常の話題もまぜる</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">お題の数</Label>
          <Select
            value={count.toString()}
            onValueChange={(value) => setCount(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="お題の数を選択してください" />
            </SelectTrigger>
            <SelectContent>
              {COUNT_PRESETS.map((preset) => (
                <SelectItem key={preset.value} value={preset.value.toString()}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="excludeCompleted"
            checked={excludeCompleted}
            onCheckedChange={(checked) => setExcludeCompleted(!!checked)}
          />
          <Label htmlFor="excludeCompleted" className="cursor-pointer">
            完了したお題はスキップ
          </Label>
        </div>
        <Button
          onClick={() => handleGenerate()}
          disabled={loading}
          className="w-full"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          お題をつくる
        </Button>
      </CardContent>
    </Card>
  );
};
