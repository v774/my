import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Play } from "lucide-react";
import { getCategory, categories, type VideoWork } from "@/lib/work-data";
import { VideoModal } from "@/components/video-modal";
import { SocialLinks } from "@/components/social-links";

export const Route = createFileRoute("/work/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Work"} — Valentyn Lavryk` },
      {
        name: "description",
        content: loaderData?.desc ?? "Selected motion design work by Valentyn Lavryk.",
      },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Category not found</h1>
        <Link to="/" className="mt-4 inline-block text-neon underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});

export function CategoryPage() {
  const category = Route.useLoaderData();
  const [active, setActive] = useState<VideoWork | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-glow-purple/25 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-glow-blue/20 blur-[180px]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 pt-8 sm:pt-10">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="work"
            className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-neon/60 hover:bg-neon/10 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Link
            to="/"
            className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-neon/60 hover:bg-neon/10 sm:text-sm"
          >
            Main
          </Link>
        </div>
        <SocialLinks />
      </header>

      <section className="relative z-10 px-4 pt-12 pb-8 sm:pt-24 sm:pb-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs sm:mb-4"
          >
            {category.tag}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2rem,7vw,6.5rem)] font-extrabold leading-[1] tracking-[-0.04em] sm:leading-[0.95]"
          >
            <span className="text-gradient">{category.title}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm sm:mt-6"
          >
            {category.desc}
          </motion.p>
        </div>
      </section>

      {/* Сітка карток проектів */}
      <section className="relative z-10 px-4 pb-16 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {category.videos.map((v: VideoWork, i: number) => (
            <VideoCard key={v.id} video={v} index={i} onOpen={() => setActive(v)} />
          ))}
        </div>
      </section>

      <section className="relative z-10 border-t border-border/60 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:mb-6">
            ◆ Categories
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((c, i) => {
              const isActive = c.slug === category.slug;
              return (
                <Link
                  key={c.slug}
                  to="/work/$category"
                  params={{ category: c.slug }}
                  disabled={isActive}
                  className={`glass-panel group flex flex-col justify-between gap-1 rounded-2xl p-4 transition-all ${
                    isActive
                      ? "border-neon/50 bg-white/5 shadow-[0_0_20px_-5px_oklch(0.78_0.18_260_/_0.15)]"
                      : "hover:scale-[1.015] hover:border-foreground/20 hover:bg-white/5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>0{i + 1} / {c.tag}</span>
                      {isActive && (
                        <span className="rounded-full bg-neon/10 px-2 py-0.5 text-[8px] font-semibold text-neon border border-neon/20 uppercase tracking-normal">
                          Active
                        </span>
                      )}
                    </div>
                    <h4 className={`mt-2 text-base font-bold tracking-tight transition-colors ${
                      isActive ? "text-neon" : "text-foreground"
                    }`}>
                      {c.title}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </div>
  );
}

function VideoCard({
  video,
  index,
  onOpen,
}: {
  video: VideoWork;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  // Рефи для збереження таймаутів між рендерами (захист від TS errors)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
  const el = ref.current;
  if (!el) return;

  if (hover) {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    
    el.currentTime = 0;
    el.play().catch(() => {});
    
    // Автопауза через 4 секунди
    timerRef.current = setTimeout(() => {
      el.pause();
    }, 4000);
  } else { // <- Тут було пропущено "else", тепер усе працюватиме від наведення миші
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // М'яка затримка паузи для CSS opacity fade-out
    pauseTimeoutRef.current = setTimeout(() => {
      el.pause();
    }, 200); 
  }

  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };
}, [hover]);

  const [resolution, fps] = video.format.split(" · ");

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      className="glass-panel group relative aspect-video overflow-hidden rounded-xl text-left transition-all duration-500 hover:border-neon/40 sm:rounded-2xl w-full"
    >
      <video
  ref={ref}
  src={video.src}
  muted
  loop
  playsInline
  preload="metadata"
  className="absolute inset-0 h-full w-full object-cover opacity-40 scale-100 transition-opacity duration-500 ease-in-out group-hover:scale-105 group-hover:opacity-100 z-0"
/>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-background/25 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Лівий верхній куток: Чітко центрована рожева неонова крапка */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-white/50 leading-none">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f] animate-pulse inline-block" />
        <span>{resolution}</span>
      </div>

      <div className="absolute top-3 right-3 z-20 font-mono text-[9px] uppercase tracking-widest text-white/50 leading-none">
        {fps || "30FPS"}
      </div>

      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div
          className="hidden md:flex pointer-events-auto items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl px-5 py-2.5 text-xs font-medium text-white shadow-2xl opacity-0 scale-90 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 hover:bg-white/15 hover:border-white/30"
        >
          <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
          Watch Project
        </div>

        <div
          className="flex md:hidden pointer-events-auto h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white shadow-xl"
        >
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-4 pointer-events-none">
        <div className="min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {video.software && video.software.length > 0 
              ? video.software.slice(0, 2).join(" · ") 
              : "Selected Work"}
          </div>
          <h3 className="mt-0.5 truncate text-sm font-bold tracking-tight text-white sm:text-base">
            {video.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}