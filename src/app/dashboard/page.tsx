"use client";

import { Icon } from "@iconify/react";
import { StatsCard } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  {
    title: "แคมเปญทั้งหมด",
    value: "12",
    change: "+2 จากเดือนที่แล้ว",
    changeType: "positive" as const,
    icon: "mdi:bullhorn",
    iconColor: "text-purple-400",
  },
  {
    title: "AI วิเคราะห์",
    value: "48",
    change: "+15 ครั้งในสัปดาห์นี้",
    changeType: "positive" as const,
    icon: "mdi:chart-areaspline",
    iconColor: "text-cyan-400",
  },
  {
    title: "Conversion Rate",
    value: "24.5%",
    change: "+3.2% จากเดือนที่แล้ว",
    changeType: "positive" as const,
    icon: "mdi:trending-up",
    iconColor: "text-green-400",
  },
  {
    title: "ROI เฉลี่ย",
    value: "320%",
    change: "+45% จากเดือนที่แล้ว",
    changeType: "positive" as const,
    icon: "mdi:cash-multiple",
    iconColor: "text-yellow-400",
  },
];

const recentAnalyses = [
  {
    title: "Facebook Ads - Summer Campaign",
    date: "27 ธ.ค. 2567",
    status: "completed",
    insight: "CTR สูงกว่าค่าเฉลี่ย 35%",
  },
  {
    title: "Instagram Reels Strategy",
    date: "26 ธ.ค. 2567",
    status: "completed",
    insight: "Engagement rate เพิ่มขึ้น 28%",
  },
  {
    title: "TikTok Ads Analysis",
    date: "25 ธ.ค. 2567",
    status: "in_progress",
    insight: "กำลังวิเคราะห์...",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ภาพรวม</h1>
          <p className="text-muted-foreground">
            ยินดีต้อนรับสู่ AI Marketing Platform
          </p>
        </div>
        <Link href="/dashboard/analytics">
          <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
            <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
            วิเคราะห์ใหม่
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Analyses */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              การวิเคราะห์ล่าสุด
            </CardTitle>
            <Link href="/dashboard/analytics">
              <Button variant="ghost" size="sm">
                ดูทั้งหมด
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        analysis.status === "completed"
                          ? "bg-green-500/20"
                          : "bg-yellow-500/20"
                      }`}
                    >
                      <Icon
                        icon={
                          analysis.status === "completed"
                            ? "mdi:check-circle"
                            : "mdi:clock-outline"
                        }
                        className={`h-5 w-5 ${
                          analysis.status === "completed"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{analysis.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {analysis.date}
                      </p>
                      <p className="mt-1 text-sm text-purple-400">
                        <Icon
                          icon="mdi:lightbulb-outline"
                          className="mr-1 inline h-4 w-4"
                        />
                        {analysis.insight}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-medium">การดำเนินการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Link href="/dashboard/analytics">
                <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                  <div className="rounded-lg bg-purple-500/20 p-3">
                    <Icon
                      icon="mdi:chart-areaspline"
                      className="h-6 w-6 text-purple-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium">AI วิเคราะห์การตลาด</p>
                    <p className="text-sm text-muted-foreground">
                      วิเคราะห์แคมเปญด้วย AI
                    </p>
                  </div>
                  <Icon
                    icon="mdi:chevron-right"
                    className="ml-auto h-5 w-5 text-muted-foreground"
                  />
                </div>
              </Link>

              <Link href="/dashboard/campaigns">
                <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                  <div className="rounded-lg bg-cyan-500/20 p-3">
                    <Icon
                      icon="mdi:bullhorn"
                      className="h-6 w-6 text-cyan-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium">สร้างแคมเปญใหม่</p>
                    <p className="text-sm text-muted-foreground">
                      เริ่มต้นแคมเปญการตลาด
                    </p>
                  </div>
                  <Icon
                    icon="mdi:chevron-right"
                    className="ml-auto h-5 w-5 text-muted-foreground"
                  />
                </div>
              </Link>

              <Link href="/dashboard/reports">
                <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                  <div className="rounded-lg bg-green-500/20 p-3">
                    <Icon
                      icon="mdi:file-document-outline"
                      className="h-6 w-6 text-green-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium">ดูรายงาน</p>
                    <p className="text-sm text-muted-foreground">
                      สรุปผลการดำเนินงาน
                    </p>
                  </div>
                  <Icon
                    icon="mdi:chevron-right"
                    className="ml-auto h-5 w-5 text-muted-foreground"
                  />
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-violet-600/10 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-purple-500/20 p-3">
              <Icon icon="mdi:robot" className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-300">
                AI Insight ประจำสัปดาห์
              </h3>
              <p className="mt-2 text-muted-foreground">
                จากการวิเคราะห์ข้อมูลแคมเปญทั้งหมดของคุณ พบว่า:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
                  <span>Facebook Ads มีประสิทธิภาพสูงสุดสำหรับกลุ่มเป้าหมายอายุ 25-34 ปี</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
                  <span>เวลาโพสต์ที่ดีที่สุดคือ 18:00-21:00 น.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:lightbulb" className="h-5 w-5 text-yellow-500" />
                  <span>แนะนำเพิ่มงบ Instagram Reels 20% เพื่อเพิ่ม Reach</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
