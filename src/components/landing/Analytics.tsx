"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Analytics() {
  return (
    <section id="analytics" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
              <Icon icon="mdi:chart-line" className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">AI Analytics</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              วิเคราะห์การตลาด
              <br />
              <span className="gradient-text">ด้วยพลัง AI</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              ใช้ AI วิเคราะห์ข้อมูลแคมเปญ เข้าใจพฤติกรรมลูกค้า 
              และรับคำแนะนำเพื่อเพิ่มประสิทธิภาพการตลาดของคุณ
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "วิเคราะห์ข้อมูลแคมเปญแบบ Real-time",
                "เข้าใจ Customer Journey และพฤติกรรม",
                "แนะนำกลยุทธ์เพิ่ม Conversion Rate",
                "รายงานสรุปพร้อม Insights อัตโนมัติ",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                    <Icon icon="mdi:check" className="h-4 w-4 text-green-500" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                ทดลองใช้ AI Analytics
                <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="gradient-border p-6 rounded-2xl">
              <div className="bg-card rounded-xl p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
                    <div className="text-2xl font-bold text-green-500">+24.5%</div>
                    <div className="text-xs text-green-500/70">↑ 12% จากเดือนที่แล้ว</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">ROI</div>
                    <div className="text-2xl font-bold text-purple-500">320%</div>
                    <div className="text-xs text-purple-500/70">↑ 45% จากเดือนที่แล้ว</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-secondary/30 rounded-lg p-4 h-40 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-purple-500 to-violet-400 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* AI Insight */}
                <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Icon icon="mdi:robot" className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-300 mb-1">AI Insight</div>
                    <div className="text-sm text-muted-foreground">
                      &quot;แคมเปญ Facebook Ads มี CTR สูงกว่าค่าเฉลี่ย 35% 
                      แนะนำเพิ่มงบประมาณ 20% เพื่อเพิ่ม Reach&quot;
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30 animate-float">
              <Icon icon="mdi:trending-up" className="h-6 w-6 text-green-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30 animate-float" style={{ animationDelay: "1s" }}>
              <Icon icon="mdi:chart-pie" className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
