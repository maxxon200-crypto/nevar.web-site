import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "nevar.web",
    short_name: "nevar.web",
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F5F2",
    theme_color: "#F6F5F2",
    lang: "it",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
