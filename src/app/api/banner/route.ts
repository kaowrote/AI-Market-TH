import { NextRequest, NextResponse } from "next/server";
import { generateBanner, getPredictionStatus, getOutputUrl, BannerGenerationInput } from "@/lib/replicate";
import { createClient } from "@supabase/supabase-js";

// Create Supabase admin client lazily to avoid build-time errors
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

async function downloadAndUploadImage(
  imageUrl: string,
  userId: string,
  format: string
): Promise<string> {
  // Validate URL
  if (!imageUrl || !imageUrl.startsWith('http')) {
    throw new Error(`Invalid image URL: ${imageUrl}`);
  }

  console.log('Downloading image from:', imageUrl);

  // Download image from Replicate
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image from Replicate: ${response.status} ${response.statusText}`);
  }

  const imageBuffer = await response.arrayBuffer();
  const filename = `${userId}/${Date.now()}.${format}`;
  
  // Determine content type
  const contentType = format === "png" ? "image/png" : 
                      format === "jpg" ? "image/jpeg" : 
                      format === "webp" ? "image/webp" : "image/png";

  console.log('Uploading to Supabase Storage:', filename);

  // Get Supabase client
  const supabase = getSupabaseAdmin();

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("banners")
    .upload(filename, imageBuffer, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("banners")
    .getPublicUrl(filename);

  console.log('Image uploaded successfully:', publicUrl);
  return publicUrl;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, aspect_ratio, resolution, output_format, safety_filter_level, userId } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const format = output_format || "png";
    const input: BannerGenerationInput = {
      prompt,
      aspect_ratio: aspect_ratio || "16:9",
      resolution: resolution || "2K",
      output_format: format,
      safety_filter_level: safety_filter_level || "block_only_high",
    };

    const prediction = await generateBanner(input);

    // If the prediction is already complete (using Prefer: wait header)
    if (prediction.status === "succeeded" && prediction.output) {
      const replicateImageUrl = getOutputUrl(prediction.output);
      
      if (!replicateImageUrl) {
        throw new Error("ไม่สามารถรับ URL ภาพจาก Replicate ได้ - โปรดตรวจสอบ API Key");
      }
      
      // Download and upload to Supabase Storage
      const userFolder = userId || "anonymous";
      const publicUrl = await downloadAndUploadImage(replicateImageUrl, userFolder, format);

      return NextResponse.json({
        success: true,
        status: prediction.status,
        imageUrl: publicUrl,
        predictionId: prediction.id,
      });
    }

    // If still processing, return the prediction ID for polling
    return NextResponse.json({
      success: true,
      status: prediction.status,
      predictionId: prediction.id,
      message: "กำลังสร้างภาพ กรุณารอสักครู่...",
    });
  } catch (error) {
    console.error("Banner API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate banner" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const predictionId = searchParams.get("id");
    const userId = searchParams.get("userId") || "anonymous";
    const format = searchParams.get("format") || "png";

    if (!predictionId) {
      return NextResponse.json(
        { error: "Prediction ID is required" },
        { status: 400 }
      );
    }

    const prediction = await getPredictionStatus(predictionId);

    if (prediction.status === "succeeded" && prediction.output) {
      const replicateImageUrl = getOutputUrl(prediction.output);
      
      if (!replicateImageUrl) {
        return NextResponse.json({
          success: false,
          status: "failed",
          error: "ไม่สามารถรับ URL ภาพจาก Replicate ได้",
        });
      }
      
      // Download and upload to Supabase Storage
      const publicUrl = await downloadAndUploadImage(replicateImageUrl, userId, format);

      return NextResponse.json({
        success: true,
        status: prediction.status,
        imageUrl: publicUrl,
      });
    }

    if (prediction.status === "failed") {
      return NextResponse.json({
        success: false,
        status: prediction.status,
        error: prediction.error || "การสร้างภาพล้มเหลว",
      });
    }

    return NextResponse.json({
      success: true,
      status: prediction.status,
      message: "กำลังสร้างภาพ...",
    });
  } catch (error) {
    console.error("Banner Status API Error:", error);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    );
  }
}
