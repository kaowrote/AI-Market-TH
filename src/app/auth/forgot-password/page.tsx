"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid relative">
      <div className="absolute inset-0 bg-radial-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md p-4">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
            <Icon icon="mdi:robot" className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            AI Market<span className="gradient-text-purple">.th</span>
          </span>
        </Link>

        <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <h1 className="text-2xl font-bold">ลืมรหัสผ่าน?</h1>
            <p className="text-muted-foreground">
              กรอกอีเมลเพื่อรับลิงก์ตั้งรหัสผ่านใหม่
            </p>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Icon icon="mdi:check-circle" className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-green-500">ส่งอีเมลแล้ว!</h2>
                <p className="text-muted-foreground text-sm">
                  เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปที่ <strong>{email}</strong> กรุณาตรวจสอบอีเมลของคุณ
                </p>
                <p className="text-muted-foreground text-xs">
                  ไม่ได้รับอีเมล? ตรวจสอบโฟลเดอร์สแปมหรือ
                  <button 
                    onClick={() => setSuccess(false)} 
                    className="text-purple-400 hover:text-purple-300 ml-1"
                  >
                    ลองใหม่อีกครั้ง
                  </button>
                </p>
                <Link href="/auth/signin">
                  <Button variant="outline" className="mt-4">
                    <Icon icon="mdi:arrow-left" className="mr-2 h-4 w-4" />
                    กลับไปหน้าเข้าสู่ระบบ
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
                      กำลังส่ง...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:email-fast" className="mr-2 h-4 w-4" />
                      ส่งลิงก์รีเซ็ตรหัสผ่าน
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  จำรหัสผ่านได้แล้ว?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
