"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
  metrics: {
    name: string;
    value: string;
    trend: "up" | "down" | "neutral";
  }[];
}

export default function AnalyticsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [campaignData, setCampaignData] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleAnalyze() {
    if (!campaignData.trim()) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: campaignData,
          type: "marketing_analysis",
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI วิเคราะห์การตลาด</h1>
        <p className="text-muted-foreground">
          ใช้ AI วิเคราะห์แคมเปญและรับคำแนะนำเพื่อเพิ่มประสิทธิภาพ
        </p>
      </div>

      <Tabs defaultValue="analyze" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="analyze">วิเคราะห์ใหม่</TabsTrigger>
          <TabsTrigger value="history">ประวัติการวิเคราะห์</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="mdi:text-box-edit-outline" className="h-5 w-5" />
                  ข้อมูลแคมเปญ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>อธิบายแคมเปญของคุณ</Label>
                  <textarea
                    className="min-h-[200px] w-full rounded-lg border border-border/50 bg-secondary/50 p-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="ตัวอย่าง: แคมเปญโฆษณา Facebook สำหรับร้านอาหาร งบประมาณ 10,000 บาท/เดือน กลุ่มเป้าหมายอายุ 25-45 ปี ในกรุงเทพฯ เป้าหมายเพิ่มยอดขาย 20%"
                    value={campaignData}
                    onChange={(e) => setCampaignData(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>งบประมาณ (บาท)</Label>
                    <Input
                      type="number"
                      placeholder="10000"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ระยะเวลา</Label>
                    <Input
                      type="text"
                      placeholder="30 วัน"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !campaignData.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Icon
                        icon="mdi:loading"
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                      กำลังวิเคราะห์...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:robot" className="mr-2 h-4 w-4" />
                      วิเคราะห์ด้วย AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="mdi:chart-areaspline" className="h-5 w-5" />
                  ผลการวิเคราะห์
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-2 font-medium text-purple-400">
                        สรุปผล
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {result.summary}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-3 font-medium text-purple-400">
                        ตัวชี้วัดหลัก
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {result.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="rounded-lg bg-secondary/50 p-3"
                          >
                            <p className="text-xs text-muted-foreground">
                              {metric.name}
                            </p>
                            <p className="text-lg font-bold">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium text-purple-400">
                        Insights
                      </h4>
                      <ul className="space-y-2">
                        {result.insights.map((insight, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Icon
                              icon="mdi:lightbulb"
                              className="mt-0.5 h-4 w-4 text-yellow-500"
                            />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium text-purple-400">
                        คำแนะนำ
                      </h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Icon
                              icon="mdi:check-circle"
                              className="mt-0.5 h-4 w-4 text-green-500"
                            />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[400px] flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-purple-500/20 p-4">
                      <Icon
                        icon="mdi:chart-areaspline"
                        className="h-12 w-12 text-purple-400"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">
                      ยังไม่มีผลการวิเคราะห์
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      กรอกข้อมูลแคมเปญและกดปุ่มวิเคราะห์เพื่อเริ่มต้น
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>ประวัติการวิเคราะห์</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Facebook Ads - Summer Campaign",
                    date: "27 ธ.ค. 2567",
                    insight: "CTR สูงกว่าค่าเฉลี่ย 35%",
                  },
                  {
                    title: "Instagram Reels Strategy",
                    date: "26 ธ.ค. 2567",
                    insight: "Engagement rate เพิ่มขึ้น 28%",
                  },
                  {
                    title: "Google Ads Optimization",
                    date: "24 ธ.ค. 2567",
                    insight: "Cost per click ลดลง 15%",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-purple-500/20 p-2">
                        <Icon
                          icon="mdi:chart-areaspline"
                          className="h-5 w-5 text-purple-400"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-purple-400">
                        {item.insight}
                      </span>
                      <Button variant="ghost" size="icon">
                        <Icon icon="mdi:eye" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
