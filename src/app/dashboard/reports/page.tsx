"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  {
    title: "รายงานประจำเดือน ธันวาคม 2567",
    date: "27 ธ.ค. 2567",
    type: "monthly",
    status: "ready",
  },
  {
    title: "รายงานประจำสัปดาห์ที่ 52",
    date: "25 ธ.ค. 2567",
    type: "weekly",
    status: "ready",
  },
  {
    title: "รายงานแคมเปญ Summer Sale",
    date: "20 ธ.ค. 2567",
    type: "campaign",
    status: "ready",
  },
  {
    title: "รายงานประจำเดือน พฤศจิกายน 2567",
    date: "30 พ.ย. 2567",
    type: "monthly",
    status: "ready",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">รายงาน</h1>
          <p className="text-muted-foreground">
            ดูและดาวน์โหลดรายงานการตลาด
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
          <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
          สร้างรายงานใหม่
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-500/30 p-3">
                <Icon icon="mdi:chart-line" className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">รายได้รวมเดือนนี้</p>
                <p className="text-2xl font-bold">฿125,400</p>
                <p className="text-sm text-green-500">+15% จากเดือนที่แล้ว</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-cyan-500/30 p-3">
                <Icon icon="mdi:account-group" className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ลูกค้าใหม่</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-green-500">+28% จากเดือนที่แล้ว</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-500/30 p-3">
                <Icon icon="mdi:trending-up" className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ROI เฉลี่ย</p>
                <p className="text-2xl font-bold">320%</p>
                <p className="text-sm text-green-500">+45% จากเดือนที่แล้ว</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>รายงานทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-purple-500/20 p-2">
                    <Icon
                      icon="mdi:file-document-outline"
                      className="h-6 w-6 text-purple-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Icon icon="mdi:eye" className="mr-2 h-4 w-4" />
                    ดู
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon icon="mdi:download" className="mr-2 h-4 w-4" />
                    ดาวน์โหลด
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
