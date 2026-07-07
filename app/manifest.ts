import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "nevar.web",
    short_name: "nevar.web",
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7f7",
    theme_color: "#f4f7f7",
    lang: "it",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
