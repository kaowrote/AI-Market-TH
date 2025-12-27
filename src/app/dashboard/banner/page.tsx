"use client";

import { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "3:2" | "2:3";
type Resolution = "1K" | "2K";
type OutputFormat = "png" | "jpg" | "webp";

const aspectRatioOptions: { value: AspectRatio; label: string; icon: string }[] = [
  { value: "16:9", label: "16:9 (Landscape)", icon: "mdi:rectangle-outline" },
  { value: "9:16", label: "9:16 (Portrait)", icon: "mdi:rectangle-outline" },
  { value: "4:3", label: "4:3", icon: "mdi:rectangle-outline" },
  { value: "3:4", label: "3:4", icon: "mdi:rectangle-outline" },
  { value: "1:1", label: "1:1 (Square)", icon: "mdi:square-outline" },
  { value: "3:2", label: "3:2", icon: "mdi:rectangle-outline" },
  { value: "2:3", label: "2:3", icon: "mdi:rectangle-outline" },
];

const resolutionOptions: { value: Resolution; label: string }[] = [
  { value: "1K", label: "1K (เร็ว)" },
  { value: "2K", label: "2K (คุณภาพสูง)" },
];

const formatOptions: { value: OutputFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "webp", label: "WebP" },
];

const promptSuggestions = [
  "ป้ายโฆษณาสินค้าออร์แกนิค สีเขียว ธรรมชาติ ภาพถ่ายคุณภาพสูง",
  "แบนเนอร์ลดราคา 50% สีแดงดำ สไตล์หรูหรา",
  "ป้ายโปรโมชั่น Summer Sale สีสดใส ทะเล ชายหาด",
  "แบนเนอร์เปิดตัวสินค้าใหม่ สไตล์มินิมอล สีขาวทอง",
  "โปสเตอร์ร้านอาหารไทย สไตล์ดั้งเดิม สีเหลืองทอง",
];

interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
}

export default function BannerPage() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [resolution, setResolution] = useState<Resolution>("2K");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [userId, setUserId] = useState<string>("anonymous");

  useEffect(() => {
    async function getUserId() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    getUserId();
  }, []);

  const pollForResult = useCallback(async (predictionId: string, format: string): Promise<string> => {
    const maxAttempts = 60;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(`/api/banner?id=${predictionId}&userId=${userId}&format=${format}`);
      const data = await response.json();

      if (data.status === "succeeded" && data.imageUrl) {
        return data.imageUrl;
      }

      if (data.status === "failed") {
        throw new Error(data.error || "การสร้างภาพล้มเหลว");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      attempts++;
    }

    throw new Error("หมดเวลา กรุณาลองใหม่อีกครั้ง");
  }, [userId]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("กรุณาใส่คำอธิบายภาพที่ต้องการ");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio: aspectRatio,
          resolution,
          output_format: outputFormat,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาด");
      }

      let imageUrl = data.imageUrl;

      // If not immediately available, poll for result
      if (!imageUrl && data.predictionId) {
        imageUrl = await pollForResult(data.predictionId, outputFormat);
      }

      if (imageUrl) {
        const newImage: GeneratedImage = {
          id: data.predictionId || Date.now().toString(),
          prompt,
          imageUrl,
          createdAt: new Date(),
        };
        setGeneratedImages((prev) => [newImage, ...prev]);
        setSelectedImage(newImage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการสร้างภาพ");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Icon icon="mdi:image-auto-adjust" className="h-7 w-7 text-purple-400" />
            สร้างแบนเนอร์ AI
          </h1>
          <p className="text-muted-foreground">
            สร้างภาพแบนเนอร์คุณภาพสูงด้วย Google Nano Banana Pro
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Generation Form */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:creation" className="h-5 w-5 text-purple-400" />
              ตั้งค่าการสร้างภาพ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="prompt">คำอธิบายภาพ (Prompt)</Label>
              <div className="relative">
                <Input
                  id="prompt"
                  placeholder="อธิบายภาพแบนเนอร์ที่คุณต้องการ..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-secondary/50 border-border/50 pr-10"
                />
                <Icon
                  icon="mdi:magic-staff"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <Icon icon="mdi:alert-circle" className="h-4 w-4" />
                  {error}
                </p>
              )}
            </div>

            {/* Prompt Suggestions */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">ตัวอย่าง Prompt</Label>
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors border border-purple-500/20"
                  >
                    {suggestion.length > 30 ? suggestion.substring(0, 30) + "..." : suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <Label>อัตราส่วนภาพ</Label>
              <div className="grid grid-cols-4 gap-2">
                {aspectRatioOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAspectRatio(option.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                      aspectRatio === option.value
                        ? "border-purple-500 bg-purple-500/20 text-purple-400"
                        : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-purple-500/50"
                    }`}
                  >
                    <Icon icon={option.icon} className="h-5 w-5" />
                    <span className="text-xs font-medium">{option.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div className="space-y-2">
              <Label>ความละเอียด</Label>
              <div className="grid grid-cols-2 gap-2">
                {resolutionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setResolution(option.value)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      resolution === option.value
                        ? "border-purple-500 bg-purple-500/20 text-purple-400"
                        : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-purple-500/50"
                    }`}
                  >
                    <Icon icon="mdi:high-definition" className="h-5 w-5" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div className="space-y-2">
              <Label>รูปแบบไฟล์</Label>
              <div className="grid grid-cols-3 gap-2">
                {formatOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setOutputFormat(option.value)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      outputFormat === option.value
                        ? "border-purple-500 bg-purple-500/20 text-purple-400"
                        : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-purple-500/50"
                    }`}
                  >
                    <Icon icon="mdi:file-image" className="h-4 w-4" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium py-6"
            >
              {isGenerating ? (
                <>
                  <Icon icon="mdi:loading" className="mr-2 h-5 w-5 animate-spin" />
                  กำลังสร้างภาพ...
                </>
              ) : (
                <>
                  <Icon icon="mdi:auto-fix" className="mr-2 h-5 w-5" />
                  สร้างแบนเนอร์
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Area */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:image-check" className="h-5 w-5 text-purple-400" />
              ตัวอย่างภาพ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-80 rounded-lg border border-dashed border-border/50 bg-secondary/20">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
                  <Icon
                    icon="mdi:image-auto-adjust"
                    className="absolute inset-0 m-auto h-6 w-6 text-purple-400"
                  />
                </div>
                <p className="mt-4 text-muted-foreground animate-pulse">
                  กำลังสร้างภาพด้วย AI...
                </p>
                <p className="text-xs text-muted-foreground mt-2">อาจใช้เวลา 10-30 วินาที</p>
              </div>
            ) : selectedImage ? (
              <div className="space-y-4">
                <div className="relative group rounded-lg overflow-hidden border border-border/50">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.prompt}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button
                      size="sm"
                      onClick={() => handleDownload(selectedImage.imageUrl, `banner-${selectedImage.id}`)}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      <Icon icon="mdi:download" className="mr-2 h-4 w-4" />
                      ดาวน์โหลด
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(selectedImage.imageUrl, "_blank")}
                      className="border-white text-white hover:bg-white/20"
                    >
                      <Icon icon="mdi:open-in-new" className="mr-2 h-4 w-4" />
                      เปิดเต็มจอ
                    </Button>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Prompt:</span> {selectedImage.prompt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 rounded-lg border border-dashed border-border/50 bg-secondary/20">
                <Icon icon="mdi:image-plus" className="h-16 w-16 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">ภาพที่สร้างจะแสดงที่นี่</p>
                <p className="text-xs text-muted-foreground mt-1">ใส่ Prompt แล้วกดสร้างแบนเนอร์</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Generated Images History */}
      {generatedImages.length > 0 && (
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:history" className="h-5 w-5 text-purple-400" />
              ภาพที่สร้างแล้ว ({generatedImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {generatedImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative group aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage?.id === image.id
                      ? "border-purple-500 ring-2 ring-purple-500/30"
                      : "border-border/50 hover:border-purple-500/50"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs text-white truncate">{image.prompt}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
