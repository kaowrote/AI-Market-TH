import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

// GET - List all campaigns for user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaigns: data });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

// POST - Create new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, platform, budget, status } = body;

    if (!userId || !name || !platform) {
      return NextResponse.json(
        { error: "userId, name, and platform are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        user_id: userId,
        name,
        platform,
        budget: budget || 0,
        status: status || "draft",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}

// PUT - Update campaign
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, userId, ...updates } = body;

    if (!id || !userId) {
      return NextResponse.json(
        { error: "id and userId are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("campaigns")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 });
  }
}

// DELETE - Delete campaign
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json(
        { error: "id and userId are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 });
  }
}
