"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const initials = user?.user_metadata?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Icon icon="mdi:bell-outline" className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] text-white">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-500/20 text-purple-400">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">
                {user?.user_metadata?.full_name || "ผู้ใช้"}
              </span>
              <Icon icon="mdi:chevron-down" className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">
                {user?.user_metadata?.full_name || "ผู้ใช้"}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon icon="mdi:account" className="mr-2 h-4 w-4" />
              โปรไฟล์
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon="mdi:cog" className="mr-2 h-4 w-4" />
              ตั้งค่า
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <Icon icon="mdi:logout" className="mr-2 h-4 w-4" />
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
