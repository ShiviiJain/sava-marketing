import { ImageResponse } from "next/og";
import { BRAND_CREAM, BrandMark } from "./_lib/brand-mark";

/**
 * Apple touch icon — 180×180 PNG generated at build time. iOS uses this
 * when users add the site to their home screen. We render the Sava mark
 * on a cream brand background instead of a transparent SVG so iOS doesn't
 * paint it on a white tile that clashes with the home-screen wallpaper.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND_CREAM,
      }}
    >
      <BrandMark size={132} />
    </div>,
    { ...size }
  );
}
