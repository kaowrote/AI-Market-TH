const REPLICATE_API_URL = "https://api.replicate.com/v1/models/google/nano-banana-pro/predictions";

export interface BannerGenerationInput {
  prompt: string;
  aspect_ratio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "3:2" | "2:3";
  resolution?: "1K" | "2K";
  output_format?: "png" | "jpg" | "webp";
  safety_filter_level?: "block_low_and_above" | "block_medium_and_above" | "block_only_high";
}

export interface ReplicatePrediction {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string | string[];
  error?: string;
  urls: {
    get: string;
    cancel: string;
  };
}

export function getOutputUrl(output: string | string[] | undefined): string | null {
  if (!output) return null;
  
  // Handle both string and array outputs
  const url = Array.isArray(output) ? output[0] : output;
  
  // Validate URL
  if (!url || !url.startsWith('http')) {
    console.error('Invalid output URL from Replicate:', url);
    return null;
  }
  
  return url;
}

const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY || "";

export async function generateBanner(input: BannerGenerationInput): Promise<ReplicatePrediction> {
  console.log('Calling Replicate API with input:', JSON.stringify(input, null, 2));
  
  const response = await fetch(REPLICATE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REPLICATE_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      input: {
        prompt: input.prompt,
        aspect_ratio: input.aspect_ratio || "16:9",
        resolution: input.resolution || "2K",
        output_format: input.output_format || "png",
        safety_filter_level: input.safety_filter_level || "block_only_high",
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Replicate API error response:', errorData);
    throw new Error(`Replicate API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  console.log('Replicate API response:', JSON.stringify(data, null, 2));
  return data;
}

export async function getPredictionStatus(predictionId: string): Promise<ReplicatePrediction> {
  const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
    headers: {
      Authorization: `Bearer ${REPLICATE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get prediction status: ${response.statusText}`);
  }

  return response.json();
}
