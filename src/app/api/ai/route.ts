import { NextRequest, NextResponse } from "next/server";
import { callOpenRouter, createMarketingAnalysisPrompt } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let messages;
    switch (type) {
      case "marketing_analysis":
        messages = createMarketingAnalysisPrompt(prompt);
        break;
      default:
        messages = createMarketingAnalysisPrompt(prompt);
    }

    // Check if API key is configured
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === "your_openrouter_api_key_here") {
      // Return mock data for demo
      return NextResponse.json({
        summary: "การวิเคราะห์แคมเปญของคุณแสดงให้เห็นศักยภาพที่ดีในการเข้าถึงกลุ่มเป้าหมาย",
        insights: [
          "กลุ่มเป้าหมายอายุ 25-34 ปี มีอัตราการตอบสนองสูงสุด",
          "เวลา 18:00-21:00 น. เป็นช่วงเวลาที่มี Engagement สูงที่สุด",
          "Content ประเภทวิดีโอมีประสิทธิภาพดีกว่ารูปภาพ 45%"
        ],
        recommendations: [
          "เพิ่มงบประมาณสำหรับ Video Ads 20%",
          "ปรับเวลาโพสต์ให้ตรงกับช่วง Prime Time",
          "ใช้ Retargeting สำหรับผู้ที่เคยดูวิดีโอ",
          "ทดสอบ A/B Testing สำหรับ Call-to-Action"
        ],
        metrics: [
          { name: "Estimated CTR", value: "3.2%", trend: "up" },
          { name: "Expected ROI", value: "280%", trend: "up" },
          { name: "Cost per Click", value: "฿5.50", trend: "down" },
          { name: "Reach Score", value: "85/100", trend: "neutral" }
        ]
      });
    }

    const response = await callOpenRouter(messages);

    // Parse JSON response
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
      }
    } catch {
      // If parsing fails, return structured response
      return NextResponse.json({
        summary: response,
        insights: [],
        recommendations: [],
        metrics: []
      });
    }

    return NextResponse.json({ 
      summary: response,
      insights: [],
      recommendations: [],
      metrics: []
    });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}
