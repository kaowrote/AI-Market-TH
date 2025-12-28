"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  async function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;

    const supabase = createClient();
    await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่า</h1>
        <p className="text-muted-foreground">จัดการบัญชีและการตั้งค่าต่างๆ</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:account" className="h-5 w-5" />
              ข้อมูลโปรไฟล์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label>ชื่อ-นามสกุล</Label>
                <Input
                  name="fullName"
                  defaultValue={user?.user_metadata?.full_name || ""}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label>อีเมล</Label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-secondary/50 border-border/50"
                />
                <p className="text-xs text-muted-foreground">
                  ไม่สามารถเปลี่ยนอีเมลได้
                </p>
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  "บันทึกการเปลี่ยนแปลง"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:key" className="h-5 w-5" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>OpenRouter API Key</Label>
              <Input
                type="password"
                placeholder="sk-or-..."
                className="bg-secondary/50 border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                ใช้สำหรับเชื่อมต่อกับ AI
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">เครดิตคงเหลือ</p>
                <p className="text-sm text-muted-foreground">
                  สำหรับการใช้งาน AI
                </p>
              </div>
              <p className="text-2xl font-bold text-purple-400">50</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="mdi:bell" className="h-5 w-5" />
              การแจ้งเตือน
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "แจ้งเตือนทางอีเมล", description: "รับการแจ้งเตือนผลวิเคราะห์" },
              { label: "รายงานประจำสัปดาห์", description: "สรุปผลการดำเนินงาน" },
              { label: "แจ้งเตือนแคมเปญ", description: "เมื่อแคมเปญมีการเปลี่ยนแปลง" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  เปิด
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <Icon icon="mdi:alert" className="h-5 w-5" />
              โซนอันตราย
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">ลบบัญชี</p>
                <p className="text-sm text-muted-foreground">
                  ลบบัญชีและข้อมูลทั้งหมดอย่างถาวร
                </p>
              </div>
              <Button variant="destructive" size="sm">
                ลบบัญชี
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
