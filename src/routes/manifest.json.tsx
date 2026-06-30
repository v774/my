import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/manifest/json")({
  loader: () => {
    const manifest = {
      name: "Valentyn Lavryk – Brand Motion Designer",
      short_name: "Lavryk Motion",
      description: "Portfolio of Valentyn Lavryk, a high-end 2D brand motion designer.",
      start_url: "/",
      display: "standalone",
      background_color: "#0a0a0a",
      theme_color: "#00ffcc",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    return new Response(JSON.stringify(manifest), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
});