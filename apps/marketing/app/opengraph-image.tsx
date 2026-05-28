import { renderOgImage } from "./_lib/og-image";

export { alt, contentType, size } from "./_lib/og-image";

export default async function OpengraphImage() {
  return renderOgImage();
}
