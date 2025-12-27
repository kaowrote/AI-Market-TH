"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
              <Icon icon="mdi:robot-happy" className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              AI Market<span className="gradient-text-purple">.th</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">
              ฟีเจอร์
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">
              ราคา
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              เงื่อนไขการใช้งาน
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-purple-500/20 transition-colors"
            >
              <Icon icon="mdi:facebook" className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-purple-500/20 transition-colors"
            >
              <Icon icon="mdi:twitter" className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-purple-500/20 transition-colors"
            >
              <Icon icon="ic:baseline-telegram" className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          © 2025 AI Market TH - AI Marketing Platform for Thai Business
        </div>
      </div>
    </footer>
  );
}
