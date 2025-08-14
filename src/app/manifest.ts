import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "혼테일 타이머 | Mapleland",
    short_name: "혼테일 타이머",
    description:
      "메이플랜드 혼테일 공략 보조 타이머 (좌/중/우 43초, 버프해제 50%·30%)",
    start_url: ".",
    scope: ".",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}


