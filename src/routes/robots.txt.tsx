import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots/txt")({
  loader: () => {
    const robotsText = `User-agent: *
Allow: /

Sitemap: https://lavryk.design/sitemap.xml
`;

    return new Response(robotsText, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  },
});