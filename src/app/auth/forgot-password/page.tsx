"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
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
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background bg-grid relative">
        <div className="absolute inset-0 bg-radial-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full max-w-md p-4">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
              <span></span>
            </div>
            <span className="text-xl font-bold">
              AI Market<span className="gradient-text-purple">.th</span>
            </span>
          </Link>

          <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <h1 className="text-2xl font-bold">ส่งอีเมลแล้ว!</h1>
              <p className="text-muted-foreground">
                กรุณาตรวจสอบอีเมลของคุณ
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-400">
                  เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง <strong>{email}</strong> แล้ว
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  หากไม่พบอีเมล กรุณาตรวจสอบในโฟลเดอร์สแปม
                </p>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                <Link
                  href="/auth/signin"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  กลับไปหน้าเข้าสู่ระบบ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid relative">
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md p-4">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
            <span></span>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
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
                <Mail className="w-4 h-4 mr-2" />
                {isLoading ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
