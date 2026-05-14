import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SAIEN",
    short_name: "SAIEN",
    description:
      "Réseau international d'experts connectant la diaspora tech pour le développement d'une intelligence artificielle éthique et performante en Afrique.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/logos/Logo_saien.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
