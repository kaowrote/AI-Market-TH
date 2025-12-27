"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconColor = "text-purple-400",
}: StatsCardProps) {
  const changeColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {change && (
              <p className={`mt-1 text-sm ${changeColors[changeType]}`}>
                {changeType === "positive" && "↑ "}
                {changeType === "negative" && "↓ "}
                {change}
              </p>
            )}
          </div>
          <div className={`rounded-lg bg-secondary/50 p-3 ${iconColor}`}>
            <Icon icon={icon} className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
