"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2567",
    platform: "Facebook",
    status: "active",
    budget: "10,000",
    spent: "6,500",
    reach: "45,000",
    conversions: "234",
  },
  {
    id: 2,
    name: "New Product Launch",
    platform: "Instagram",
    status: "active",
    budget: "15,000",
    spent: "8,200",
    reach: "62,000",
    conversions: "189",
  },
  {
    id: 3,
    name: "Brand Awareness",
    platform: "TikTok",
    status: "paused",
    budget: "8,000",
    spent: "3,400",
    reach: "120,000",
    conversions: "56",
  },
  {
    id: 4,
    name: "Holiday Promotion",
    platform: "Google",
    status: "draft",
    budget: "20,000",
    spent: "0",
    reach: "0",
    conversions: "0",
  },
];

const platformIcons: Record<string, string> = {
  Facebook: "mdi:facebook",
  Instagram: "mdi:instagram",
  TikTok: "ic:baseline-tiktok",
  Google: "mdi:google",
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-500",
  paused: "bg-yellow-500/20 text-yellow-500",
  draft: "bg-gray-500/20 text-gray-400",
};

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">แคมเปญ</h1>
          <p className="text-muted-foreground">
            จัดการแคมเปญการตลาดทั้งหมดของคุณ
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
          <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
          สร้างแคมเปญใหม่
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">แคมเปญทั้งหมด</div>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Active</div>
            <div className="text-2xl font-bold text-green-500">2</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">งบใช้ไป</div>
            <div className="text-2xl font-bold">฿18,100</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Conversions</div>
            <div className="text-2xl font-bold text-purple-500">479</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>รายการแคมเปญ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-purple-500/20 p-2">
                    <Icon
                      icon={platformIcons[campaign.platform]}
                      className="h-6 w-6 text-purple-400"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{campaign.name}</p>
                      <Badge className={statusColors[campaign.status]}>
                        {campaign.status === "active" && "กำลังใช้งาน"}
                        {campaign.status === "paused" && "หยุดชั่วคราว"}
                        {campaign.status === "draft" && "แบบร่าง"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {campaign.platform} • งบ ฿{campaign.budget}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">ใช้ไป</p>
                    <p className="font-medium">฿{campaign.spent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="font-medium">{campaign.reach}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="font-medium text-green-500">
                      {campaign.conversions}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon icon="mdi:chart-line" className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon icon="mdi:pencil" className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon icon="mdi:dots-vertical" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
