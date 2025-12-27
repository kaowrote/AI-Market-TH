"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
            <Icon icon="mdi:robot-happy" className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold">
            AI Market<span className="gradient-text-purple">.th</span>
          </span>
        </Link>

        <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <h1 className="text-2xl font-bold">ยินดีต้อนรับกลับ</h1>
            <p className="text-muted-foreground">
              เข้าสู่ระบบเพื่อใช้งาน Dashboard
            </p>
          </CardHeader>
          <CardContent>
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
                  className="bg-secondary/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">รหัสผ่าน</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="กรอกรหัสผ่าน"
                  required
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
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    เข้าสู่ระบบ
                    <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              ยังไม่มีบัญชี?{" "}
              <Link
                href="/auth/signup"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
