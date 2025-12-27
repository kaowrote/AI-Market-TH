"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "ฟรี",
    description: "เริ่มต้นใช้งาน AI Analytics",
    features: [
      "AI วิเคราะห์ 10 ครั้ง/เดือน",
      "รายงานพื้นฐาน",
      "1 แคมเปญ",
      "Email Support",
    ],
    cta: "เริ่มต้นฟรี",
    popular: false,
  },
  {
    name: "Pro",
    price: "฿499",
    period: "/เดือน",
    description: "สำหรับธุรกิจที่กำลังเติบโต",
    features: [
      "AI วิเคราะห์ไม่จำกัด",
      "รายงานขั้นสูง + Insights",
      "แคมเปญไม่จำกัด",
      "AI Recommendations",
      "Export Reports",
      "Priority Support",
    ],
    cta: "เลือก Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "ติดต่อเรา",
    description: "สำหรับองค์กรขนาดใหญ่",
    features: [
      "ทุกฟีเจอร์ใน Pro",
      "API Access",
      "Custom Integration",
      "Dedicated Support",
      "SLA Guarantee",
      "Team Management",
    ],
    cta: "ติดต่อฝ่ายขาย",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
            <Icon icon="mdi:tag" className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">ราคา</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            เลือกแพ็กเกจที่
            <span className="gradient-text"> เหมาะกับคุณ</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            เริ่มต้นฟรี ไม่ต้องใช้บัตรเครดิต อัพเกรดเมื่อพร้อม
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-card/50 border-border/50 ${
                plan.popular
                  ? "border-purple-500/50 scale-105 shadow-xl shadow-purple-500/10"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-violet-600">
                    ยอดนิยม
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Icon
                        icon="mdi:check-circle"
                        className="h-5 w-5 text-purple-500 flex-shrink-0"
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className="block">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
