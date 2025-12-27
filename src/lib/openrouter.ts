const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

export async function callOpenRouter(
  messages: Message[],
  model: string = "openai/gpt-4o-mini"
): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "AI Market TH",
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const data: OpenRouterResponse = await response.json();
  return data.choices[0]?.message?.content || "";
}

export function createMarketingAnalysisPrompt(campaignData: string): Message[] {
  return [
    {
      role: "system",
      content: `คุณเป็น AI ผู้เชี่ยวชาญด้านการตลาดดิจิทัลสำหรับธุรกิจไทย 
      หน้าที่ของคุณคือวิเคราะห์ข้อมูลแคมเปญการตลาดและให้คำแนะนำที่เป็นประโยชน์
      
      ตอบเป็นภาษาไทยเท่านั้น
      
      ให้ผลลัพธ์ในรูปแบบ JSON ดังนี้:
      {
        "summary": "สรุปผลการวิเคราะห์โดยย่อ",
        "insights": ["insight 1", "insight 2", "insight 3"],
        "recommendations": ["คำแนะนำ 1", "คำแนะนำ 2", "คำแนะนำ 3"],
        "metrics": [
          {"name": "ชื่อตัวชี้วัด", "value": "ค่า", "trend": "up|down|neutral"},
          ...
        ]
      }`,
    },
    {
      role: "user",
      content: `วิเคราะห์แคมเปญการตลาดนี้: ${campaignData}`,
    },
  ];
}
