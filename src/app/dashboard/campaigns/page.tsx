"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: string;
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
  created_at: string;
}

const platformIcons: Record<string, string> = {
  Facebook: "mdi:facebook",
  Instagram: "mdi:instagram",
  TikTok: "ic:baseline-tiktok",
  Google: "mdi:google",
  LINE: "bi:line",
  Twitter: "mdi:twitter",
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-500",
  paused: "bg-yellow-500/20 text-yellow-500",
  draft: "bg-gray-500/20 text-gray-400",
  completed: "bg-blue-500/20 text-blue-400",
};

const statusLabels: Record<string, string> = {
  active: "กำลังใช้งาน",
  paused: "หยุดชั่วคราว",
  draft: "แบบร่าง",
  completed: "เสร็จสิ้น",
};

const platforms = ["Facebook", "Instagram", "TikTok", "Google", "LINE", "Twitter"];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    platform: "Facebook",
    budget: "",
    status: "draft",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCampaigns();
    }
  }, [userId]);

  async function fetchUser() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUserId(data.user.id);
    }
  }

  async function fetchCampaigns() {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/campaigns", {
        headers: { "x-user-id": userId },
      });
      const data = await response.json();
      if (data.campaigns) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setEditingCampaign(null);
    setFormData({ name: "", platform: "Facebook", budget: "", status: "draft" });
    setShowModal(true);
    setError(null);
  }

  function openEditModal(campaign: Campaign) {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      platform: campaign.platform,
      budget: campaign.budget.toString(),
      status: campaign.status,
    });
    setShowModal(true);
    setError(null);
  }

  function openDeleteModal(campaign: Campaign) {
    setDeletingCampaign(campaign);
    setShowDeleteModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !formData.name || !formData.platform) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const url = "/api/campaigns";
      const method = editingCampaign ? "PUT" : "POST";
      const body = editingCampaign
        ? { id: editingCampaign.id, userId, ...formData, budget: parseFloat(formData.budget) || 0 }
        : { userId, ...formData, budget: parseFloat(formData.budget) || 0 };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShowModal(false);
        fetchCampaigns();
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!userId || !deletingCampaign) return;

    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/campaigns?id=${deletingCampaign.id}&userId=${userId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShowDeleteModal(false);
        setDeletingCampaign(null);
        fetchCampaigns();
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsSaving(false);
    }
  }

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === "active").length,
    totalSpent: campaigns.reduce((sum, c) => sum + (c.spent || 0), 0),
    totalConversions: campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">แคมเปญ</h1>
          <p className="text-muted-foreground">
            จัดการแคมเปญการตลาดทั้งหมดของคุณ
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
        >
          <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
          สร้างแคมเปญใหม่
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">แคมเปญทั้งหมด</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Active</div>
            <div className="text-2xl font-bold text-green-500">{stats.active}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">งบใช้ไป</div>
            <div className="text-2xl font-bold">฿{stats.totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Conversions</div>
            <div className="text-2xl font-bold text-purple-500">{stats.totalConversions}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>รายการแคมเปญ</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Icon icon="mdi:loading" className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-purple-500/20 p-4">
                <Icon icon="mdi:bullhorn" className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium">ยังไม่มีแคมเปญ</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                เริ่มต้นสร้างแคมเปญแรกของคุณ
              </p>
              <Button onClick={openCreateModal} className="mt-4">
                <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
                สร้างแคมเปญ
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-purple-500/20 p-2">
                      <Icon
                        icon={platformIcons[campaign.platform] || "mdi:bullhorn"}
                        className="h-6 w-6 text-purple-400"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{campaign.name}</p>
                        <Badge className={statusColors[campaign.status] || statusColors.draft}>
                          {statusLabels[campaign.status] || campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {campaign.platform} • งบ ฿{campaign.budget?.toLocaleString() || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">ใช้ไป</p>
                      <p className="font-medium">฿{campaign.spent?.toLocaleString() || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Reach</p>
                      <p className="font-medium">{campaign.reach?.toLocaleString() || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="font-medium text-green-500">
                        {campaign.conversions || 0}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(campaign)}>
                        <Icon icon="mdi:pencil" className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteModal(campaign)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Icon icon="mdi:delete" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-card border border-border p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingCampaign ? "แก้ไขแคมเปญ" : "สร้างแคมเปญใหม่"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>ชื่อแคมเปญ</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Summer Sale 2567"
                  className="bg-secondary/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label>แพลตฟอร์ม</Label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full rounded-lg border border-border/50 bg-secondary/50 p-2"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>งบประมาณ (บาท)</Label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="10000"
                  className="bg-secondary/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label>สถานะ</Label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-lg border border-border/50 bg-secondary/50 p-2"
                >
                  <option value="draft">แบบร่าง</option>
                  <option value="active">กำลังใช้งาน</option>
                  <option value="paused">หยุดชั่วคราว</option>
                  <option value="completed">เสร็จสิ้น</option>
                </select>
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600"
                >
                  {isSaving ? (
                    <Icon icon="mdi:loading" className="h-4 w-4 animate-spin" />
                  ) : editingCampaign ? (
                    "บันทึก"
                  ) : (
                    "สร้าง"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-card border border-border p-6">
            <h2 className="text-xl font-bold mb-4">ยืนยันการลบ</h2>
            <p className="text-muted-foreground mb-6">
              คุณต้องการลบแคมเปญ "{deletingCampaign.name}" หรือไม่?
              การดำเนินการนี้ไม่สามารถยกเลิกได้
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingCampaign(null);
                }}
                className="flex-1"
              >
                ยกเลิก
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? (
                  <Icon icon="mdi:loading" className="h-4 w-4 animate-spin" />
                ) : (
                  "ลบแคมเปญ"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
