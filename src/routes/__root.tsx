import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

// Повністю кастомізована преміальна сторінка 404 під стиль твого портфоліо
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 font-sans text-white">
      <div className="max-w-md text-center">
        <div className="relative inline-block">
          <h1 className="font-mono text-8xl font-black tracking-tighter text-neutral-800 sm:text-9xl">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.6)]">
              SYSTEM_ERROR
            </span>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-neutral-400 max-w-xs mx-auto">
          The cinematic sequence you are trying to reach has moved or doesn't exist.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#00ffcc]"
          >
            Go to Main System
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-white font-sans">
      <div className="max-w-md text-center">
        <h1 className="font-mono text-lg font-bold tracking-widest text-red-500 uppercase">
          [ Render Error ]
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 cursor-pointer"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors hover:bg-neutral-800"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Valentyn Lavryk — Brand Motion Designer" },
      { name: "description", content: "Portfolio of Valentyn Lavryk, a high-end 2D brand motion designer crafting kinetic typography, logo reveals, and motion systems." },
      { name: "author", content: "Valentyn Lavryk" },
      
      // Open Graph / Facebook (Повний набір мета-тегів)
      { property: "og:title", content: "Valentyn Lavryk — Brand Motion Designer" },
      { property: "og:description", content: "High-end 2D motion design: kinetic typography, logo reveals, brand motion systems." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lavryk.design" }, // Заміни на свій домен, коли купиш
      { property: "og:image", content: "https://lavryk.design/og-image.jpg" }, // Твоє майбутнє прев'ю-зображення
      
      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Valentyn Lavryk — Brand Motion Designer" },
      { name: "twitter:description", content: "High-end 2D motion design: kinetic typography, logo reveals, brand motion systems." },
      { name: "twitter:image", content: "https://lavryk.design/og-image.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" }, 
    ],
    // Додаємо скрипт завантаження Cloudflare Turnstile
    scripts: [
      {
        src: "https://challenges.cloudflare.com/turnstile/v0/api.js",
        async: true,
        defer: true,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Мікророзмітка Schema.org — Пошукові роботи одразу зрозуміють структуру профілю фрілансера
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Valentyn Lavryk",
    "jobTitle": "Brand Motion Designer",
    "url": "https://lavryk.design",
    "image": "public/covers/avatar.jpg", // Посилання на аватарку
    "description": "High-end 2D brand motion designer crafting kinetic typography, logo reveals, and motion systems.",
    "sameAs": [
      "https://www.instagram.com/valentyn.motion/",
      "https://t.me/valentyn_motion"
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* Ін'єкція мікророзмітки в head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased selection:bg-[#00ffcc]/30 selection:text-[#00ffcc]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}