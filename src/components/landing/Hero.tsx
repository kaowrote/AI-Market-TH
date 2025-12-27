"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
            <Icon icon="mdi:sparkles" className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">
              New! AI Analytics สำหรับวิเคราะห์การตลาด
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            วิเคราะห์{" "}
            <span className="gradient-text">การตลาด</span>
            <br />
            ด้วย AI ที่เข้าใจ
            <span className="gradient-text-purple"> ธุรกิจ</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            วิเคราะห์แคมเปญ เข้าใจลูกค้า และเพิ่มประสิทธิภาพการตลาดทั้งหมดในที่เดียว
            ด้วย AI ที่รู้จักตลาดไทย
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 glow-purple-sm"
              >
                <Icon icon="mdi:play" className="mr-2 h-5 w-5" />
                เริ่มต้นใช้งานเลย
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-purple-500/30 hover:bg-purple-500/10"
              >
                ดูฟีเจอร์ทั้งหมด
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
              <span>ไม่ต้องใช้บัตรเครดิต</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
              <span>รองรับภาษาไทย 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
              <span>เครดิตทดลองฟรี</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
