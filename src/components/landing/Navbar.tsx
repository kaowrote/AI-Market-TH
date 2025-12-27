"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
              <Icon icon="mdi:robot-happy" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              AI Market<span className="gradient-text-purple">.th</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ฟีเจอร์
            </Link>
            <Link
              href="#analytics"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              วิเคราะห์
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ราคา
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                เข้าสู่ระบบ
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
              >
                เริ่มต้นฟรี
                <Icon icon="mdi:arrow-right" className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
