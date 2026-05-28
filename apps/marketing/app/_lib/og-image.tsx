import { ImageResponse } from "next/og";
import { BRAND_CREAM, BRAND_LOGO_TRUE, BrandMark } from "./brand-mark";

/**
 * Shared render for the Open Graph and Twitter card images. Next 16 picks up
 * `app/opengraph-image.tsx` and `app/twitter-image.tsx` as separate routes, so
 * both files re-export this renderer to keep one composition.
 *
 * Output is a single static PNG generated at build time. The composition pulls
 * the cream gradient + cedar mark from the marketing hero so previews land
 * in-brand. The headline renders in Satori's bundled sans (Inter) — Charter
 * ships only as woff2 in `charter-webfont` and Satori needs raw TTF/OTF, so
 * loading the marketing serif here would require pulling a separate TTF
 * package just for OG. Re-evaluate if/when @sava/tokens vendors a TTF copy.
 */
export const alt = "Sava Trust Company. Nevada-chartered trust administration.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function renderOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 96px",
        background: `radial-gradient(900px 600px at 50% 40%, ${BRAND_CREAM} 0%, transparent 70%), linear-gradient(180deg, #fdfaf4 0%, #ffffff 60%)`,
        color: BRAND_LOGO_TRUE,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <BrandMark size={56} />
        <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.4 }}>
          Sava <span style={{ color: "#6b7c80" }}>Trust Company</span>
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: 92,
            fontWeight: 500,
            letterSpacing: -2.4,
            lineHeight: 1.04,
            maxWidth: 980,
            color: "#2a2520",
          }}
        >
          Trust administration, built for the future.
        </div>
        <div style={{ fontSize: 30, color: "#5c5550", maxWidth: 880, lineHeight: 1.35 }}>
          A Nevada-chartered trust company for modern families and the attorneys who serve them.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#8a8076",
          letterSpacing: 0.4,
        }}
      >
        <span>savatrustcompany.com</span>
        <span style={{ textTransform: "uppercase", letterSpacing: 3 }}>Nevada · 2026</span>
      </div>
    </div>,
    { ...size }
  );
}
