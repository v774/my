import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/work-data"; // Твій імпорт категорій

export const Route = createFileRoute("/sitemap/xml")({
  loader: () => {
    const baseUrl = "https://lavryk.design"; // Твій домен
    const currentDate = new Date().toISOString().split("T")[0];

    // Головна сторінка сайту
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Автоматично та безпечно додаємо сторінки категорій без помилок типізації
    if (Array.isArray(categories)) {
      categories.forEach((category) => {
        // Використовуємо лише те поле, яке точно існує у твоїй структурі даних (slug)
        if (category && category.slug) {
          xml += `
  <url>
    <loc>${baseUrl}/work/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }
      });
    }

    xml += "\n</urlset>";

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  },
});