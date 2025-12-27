"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    title: "ภาพรวม",
    href: "/dashboard",
    icon: "mdi:view-dashboard",
  },
  {
    title: "AI วิเคราะห์",
    href: "/dashboard/analytics",
    icon: "mdi:chart-areaspline",
  },
  {
    title: "สร้างแบนเนอร์",
    href: "/dashboard/banner",
    icon: "mdi:image-auto-adjust",
  },
  {
    title: "แคมเปญ",
    href: "/dashboard/campaigns",
    icon: "mdi:bullhorn",
  },
  {
    title: "รายงาน",
    href: "/dashboard/reports",
    icon: "mdi:file-document-outline",
  },
  {
    title: "ตั้งค่า",
    href: "/dashboard/settings",
    icon: "mdi:cog",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
            <Icon icon="mdi:robot-happy" className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">
            AI Market<span className="gradient-text-purple">.th</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon
                  icon={item.icon}
                  className={`h-5 w-5 ${isActive ? "text-purple-400" : ""}`}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-sidebar-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
            onClick={handleSignOut}
          >
            <Icon icon="mdi:logout" className="mr-2 h-5 w-5" />
            ออกจากระบบ
          </Button>
        </div>
      </div>
    </aside>
  );
}
