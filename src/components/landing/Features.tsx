"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "mdi:chart-areaspline",
    title: "AI วิเคราะห์",
    description: "วิเคราะห์แคมเปญการตลาด ข้อมูลลูกค้า และแนะนำกลยุทธ์ที่เหมาะสม",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: "mdi:account-group",
    title: "เข้าใจลูกค้า",
    description: "วิเคราะห์พฤติกรรมและความต้องการของกลุ่มเป้าหมายด้วย AI",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: "mdi:trending-up",
    title: "เพิ่มยอดขาย",
    description: "รับคำแนะนำเพื่อเพิ่ม Conversion และ ROI จากแคมเปญการตลาด",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: "mdi:file-document-edit",
    title: "สร้าง Content",
    description: "ใช้ AI ช่วยสร้างเนื้อหาการตลาดที่ตรงใจกลุ่มเป้าหมาย",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: "mdi:target",
    title: "กำหนดเป้าหมาย",
    description: "ตั้งเป้าหมายและติดตามผลลัพธ์แคมเปญแบบ Real-time",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: "mdi:robot",
    title: "AI Assistant",
    description: "ถามตอบกับ AI เกี่ยวกับการตลาดและธุรกิจของคุณได้ตลอด 24 ชม.",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
            <Icon icon="mdi:star-four-points" className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">ฟีเจอร์</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ทุกเครื่องมือที่คุณต้องการ
            <br />
            <span className="gradient-text">ในที่เดียว</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI Marketing Platform ที่ช่วยวิเคราะห์ วางแผน และเพิ่มประสิทธิภาพการตลาดของธุรกิจคุณ
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/50 border-border/50 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    icon={feature.icon}
                    className={`h-6 w-6 bg-gradient-to-r ${feature.color} bg-clip-text`}
                    style={{ color: feature.color.includes("purple") ? "#a855f7" : undefined }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
