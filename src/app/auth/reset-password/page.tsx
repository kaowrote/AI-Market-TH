"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check if user has a valid session from the reset link
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No session means the reset link is invalid or expired
        setError("ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุ กรุณาขอลิงก์ใหม่");
      }
    };
    
    checkSession();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);

    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
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
            <h1 className="text-2xl font-bold">ตั้งรหัสผ่านใหม่</h1>
            <p className="text-muted-foreground">
              กรอกรหัสผ่านใหม่ที่ต้องการใช้
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
                <h2 className="text-lg font-semibold text-green-500">เปลี่ยนรหัสผ่านสำเร็จ!</h2>
                <p className="text-muted-foreground text-sm">
                  กำลังพาคุณไปยัง Dashboard...
                </p>
                <div className="flex justify-center">
                  <Icon icon="mdi:loading" className="h-6 w-6 animate-spin text-purple-500" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    {error}
                    {error.includes("หมดอายุ") && (
                      <Link 
                        href="/auth/forgot-password" 
                        className="block mt-2 text-purple-400 hover:text-purple-300"
                      >
                        ขอลิงก์รีเซ็ตใหม่
                      </Link>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">รหัสผ่านใหม่</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:lock-reset" className="mr-2 h-4 w-4" />
                      ตั้งรหัสผ่านใหม่
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
