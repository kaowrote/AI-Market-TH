import type { Metadata } from "next";
import { Noto_Sans_Thai, Space_Grotesk } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Market TH - AI Marketing Platform สำหรับธุรกิจไทย",
  description: "สร้าง Content วิเคราะห์การตลาด และเพิ่มยอดขายด้วย AI ที่เข้าใจธุรกิจไทย",
  keywords: ["AI Marketing", "การตลาด AI", "วิเคราะห์การตลาด", "Content AI", "ธุรกิจไทย"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body
        className={`${notoSansThai.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-noto-thai), var(--font-space-grotesk), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
