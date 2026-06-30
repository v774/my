export type VideoWork = {
  id: string;
  title: string;
  src: string;
  poster?: string;
  description: string;
  format: string;
  software: string[];
  deliveryTime: string;
  glow?: string;
};

export type Category = {
  slug: string;
  title: string;
  tag: string;
  desc: string;
  span: string;
  hue: string;
  cover: string;
  videos: VideoWork[];
};

const SAMPLE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

export const categories: Category[] = [
  {
    slug: "Logo Animation",
    title: "Logo Animation",
    tag: "01 / Identity in Motion",
    desc: "Logo animations designed to make every brand instantly recognizable.",
    span: "md:col-span-2 md:row-span-2",
    hue: "from-[oklch(0.45_0.25_270)] to-[oklch(0.35_0.2_220)]",
    cover: "covers/1.webp",
    videos: [
      { id: "bi-1", title: "Enigma - logo", src: "/LogoAnimation_video/1.webm", description: "Bold typographic logo reveal utilizing rhythmic sync and modern motion design.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "3 days" },
      { id: "bi-2", title: "TechLogo - logo", src: "/LogoAnimation_video/2.webm", description: "Dynamic logo animation with kinetic elements for a tech brand identity.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "5 days" },
      { id: "bi-3", title: "Coolinart - logo", src: "/LogoAnimation_video/3.webm", description: "Futuristic glitch logo animation with complex shape layers and lighting effects.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "10 days" },
      { id: "bi-4", title: "NEXARA - logo", src: "/LogoAnimation_video/4.webm", description: "Sleek and looping vector animation focusing on brand geometry and smooth easing.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "4 days" },
      { id: "bi-5", title: "Food Talk", src: "/LogoAnimation_video/5.webm", description: "Organic frame-by-frame liquid reveal tailored for a creative studio logo.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "2 weeks" },
      { id: "bi-6", title: "Palm - logo", src: "/LogoAnimation_video/6.webm", description: "Organic frame-by-frame liquid reveal tailored for a creative studio logo.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "2 weeks" },
      { id: "bi-7", title: "Frame - logo", src: "/LogoAnimation_video/7.webm", description: "Organic frame-by-frame liquid reveal tailored for a creative studio logo.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "2 weeks" },
      { id: "bi-8", title: "BBQ - logo", src: "/LogoAnimation_video/8.webm", description: "Organic frame-by-frame liquid reveal tailored for a creative studio logo.", format: "1920x1080 · 30FPS", software: ["After Effects", "Illustrator"], deliveryTime: "2 weeks" },

    ],
  },
  {
    slug: "Animated Icons",
    title: "Animated Icons",
    tag: "02 / UI in Motion",
    desc: "Animated icons that make digital products feel more engaging.",
    span: "md:col-span-1 md:row-span-1",
    hue: "from-[oklch(0.5_0.26_305)] to-[oklch(0.3_0.18_280)]",
    cover: "covers/2.webp",
    videos: [
      { id: "kt-1", title: "Manifesto — Kinetic Type", src: `${SAMPLE}/ForBiggerEscapes.mp4`, description: "Typographic manifesto piece for a product launch.", format: "4K · 60FPS", software: ["After Effects", "Glyphs"], deliveryTime: "12 days" },
      { id: "kt-2", title: "Pulse — Type Rhythm", src: `${SAMPLE}/ForBiggerFun.mp4`, description: "Beat-synced kinetic type for a music platform.", format: "2K · 30FPS", software: ["After Effects"], deliveryTime: "1 week" },
      { id: "kt-3", title: "Echo — Spoken Word", src: `${SAMPLE}/ForBiggerJoyrides.mp4`, description: "Spoken-word visualizer with reactive typography.", format: "4K · 24FPS", software: ["After Effects", "Premiere"], deliveryTime: "2 weeks" },
      { id: "kt-4", title: "Statement — Bold Quote Series", src: `${SAMPLE}/ForBiggerMeltdowns.mp4`, description: "Series of high-impact typographic quote cards.", format: "Square · 30FPS", software: ["After Effects"], deliveryTime: "5 days" },
    ],
  },
  {
    slug: "Lottie & Web Icons",
    title: "Lottie & Web Icons",
    tag: "03 / Interactive UI",
    desc: "Lottie animations optimized for web and apps.",
    span: "md:col-span-1 md:row-span-1",
    hue: "from-[oklch(0.45_0.22_240)] to-[oklch(0.3_0.15_260)]",
    cover: "covers/3.webp",
    videos: [
      { id: "lr-1", title: "Orbit — Signature Reveal", src: `${SAMPLE}/Sintel.mp4`, description: "Crisp 4-second signature reveal with sound design.", format: "4K · 60FPS", software: ["After Effects", "Trapcode"], deliveryTime: "5 days" },
      { id: "lr-2", title: "Forge — Liquid Mark", src: `${SAMPLE}/SubaruOutbackOnStreetAndDirt.mp4`, description: "Liquid morph reveal for an industrial brand.", format: "4K · 30FPS", software: ["After Effects", "Houdini"], deliveryTime: "1 week" },
      { id: "lr-3", title: "Halo — Light Reveal", src: `${SAMPLE}/TearsOfSteel.mp4`, description: "Volumetric light-bloom reveal for a premium label.", format: "4K · 60FPS", software: ["After Effects"], deliveryTime: "6 days" },
    ],
  },
  {
    slug: "Animated Posters",
    title: "Animated Posters",
    tag: "04 / Visual Art",
    desc: "Motion posters designed to capture attention instantly.",
    span: "md:col-span-3 md:row-span-1",
    hue: "from-[oklch(0.5_0.24_295)] to-[oklch(0.35_0.2_250)]",
    cover: "covers/4.webp",
    videos: [
      { id: "ms-1", title: "Atlas — Motion Tokens", src: `${SAMPLE}/VolkswagenGTIReview.mp4`, description: "Reusable motion tokens shipped as a Lottie library.", format: "Vector · Lottie", software: ["After Effects", "Bodymovin", "LottieFiles"], deliveryTime: "4 weeks" },
      { id: "ms-2", title: "Beacon — Product UI Motion", src: `${SAMPLE}/WeAreGoingOnBullrun.mp4`, description: "Micro-interactions library handed off to engineering.", format: "Vector · Lottie", software: ["After Effects", "Figma"], deliveryTime: "3 weeks" },
      { id: "ms-3", title: "Compass — Cross-channel Kit", src: `${SAMPLE}/WhatCarCanYouGetForAGrand.mp4`, description: "Channel-aware motion kit for socials, web and OOH.", format: "Mixed · up to 4K", software: ["After Effects", "Premiere"], deliveryTime: "5 weeks" },
    ],
  },
];

export const heroReel: VideoWork[] = [
  {
    id: "hero-1",
    title: "Enigma - logo animation",
    src: "/karusel_video/1.webm",
    description: "Premium logo animation asset.",
    format: "1920 x 1080 · 30FPS",
    software: ["After Effects"],
    deliveryTime: "3 days",
    glow: "#6f00ff17" // Червоний
  },
  {
    id: "hero-2",
    title: "BBQ - logo animation",
    src: "/karusel_video/2.webm",
    description: "Dynamic brand identity loop.",
    format: "1920 x 1080 · 30FPS",
    software: ["After Effects"],
    deliveryTime: "4 days",
    glow: "#2f00ff3f" // Синій
  },
  {
    id: "hero-3",
    title: "Nexara - logo animation",
    src: "/karusel_video/3.webm",
    description: "Full motion graphics and visual identity showcase.",
    format: "1920 x 1080 · 30FPS",
    software: ["After Effects"],
    deliveryTime: "5 days",
    glow: "#0400ff2a" // Фіолетовий
  },
  {
    id: "hero-4",
    title: "Coolinart - logo animation",
    src: "/karusel_video/4.webm",
    description: "Modular brand motion system with reusable scenes.",
    format: "1920 x 1080 · 30FPS",
    software: ["After Effects"],
    deliveryTime: "3 days",
    glow: "#ea00ff13" // Зелений
  },
  {
    id: "hero-5",
    title: "TechLogo - logo animation",
    src: "/karusel_video/5.webm",
    description: "Micro-interactions library designed for web and mobile.",
    format: "1920 x 1080 · 30FPS",
    software: ["After Effects"],
    deliveryTime: "4 days",
    glow: "#6f00ff34" // Жовтий
  }
];

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/valentyn.motion/", icon: "instagram" },
  { name: "TikTok", href: "https://www.tiktok.com/@valentyn.motion", icon: "tiktok" },
  { name: "Telegram", href: "https://t.me/valentyn_motion", icon: "telegram" },
  { name: "Fiverr", href: "https://www.fiverr.com/design_by_vl", icon: "fiverr" },
] as const;

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}