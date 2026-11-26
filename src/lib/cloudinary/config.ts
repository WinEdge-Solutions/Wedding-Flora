import crypto from "node:crypto";

export const CLOUDINARY_FOLDER = "wedding-flora";

export function isCloudinaryConfigured(): boolean {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  return Boolean(
    cloudName &&
      apiKey &&
      apiSecret &&
      !cloudName.includes("your-cloud-name") &&
      !apiKey.includes("your-cloudinary-api-key") &&
      !apiSecret.includes("your-cloudinary-api-secret")
  );
}

export function signCloudinaryParams(params: Record<string, string | number>): string {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error("CLOUDINARY_API_SECRET is not configured.");
  }

  const sorted = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== "")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${sorted}${apiSecret}`).digest("hex");
}

/**
 * Injects Cloudinary auto-format & auto-quality transformations (f_auto,q_auto)
 * into delivery URLs so photos and 4K wedding reels load as fast as possible.
 */
export function toOptimizedCloudinaryUrl(secureUrl: string): string {
  if (!secureUrl.includes("/upload/")) return secureUrl;
  if (secureUrl.includes("/upload/f_auto")) return secureUrl;
  return secureUrl.replace("/upload/", "/upload/f_auto,q_auto/");
}

