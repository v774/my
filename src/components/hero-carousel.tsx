import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import { motion } from "motion/react";
import { heroReel } from "@/lib/work-data";


export function HeroCarousel({
  onPlay,
  isVideoOpen,
}: {
  onPlay: (index: number) => void;
  isVideoOpen?: boolean;
}) {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplayRef.current],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const autoplay = autoplayRef.current;
    if (isVideoOpen) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [isVideoOpen, embla]);

  const scrollPrev = useCallback(() => {
    autoplayRef.current.reset();
    embla?.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    autoplayRef.current.reset();
    embla?.scrollNext();
  }, [embla]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-14 sm:mt-20 select-none"
    >
      <div className="relative z-10">
        <div ref={emblaRef} className="overflow-hidden py-4">
          <div className="flex touch-pan-y">
            {heroReel.map((v, i) => (
              <div
                key={v.id}
                className="relative min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-[70%] md:basis-[60%]"
              >
                <HeroSlide
                  video={v}
                  active={i === selected}
                  onPlay={() => onPlay(i)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="glass-panel absolute top-1/2 left-2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-all hover:scale-105 hover:border-white/20 hover:bg-white/5 sm:flex sm:left-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="glass-panel absolute top-1/2 right-2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-all hover:scale-105 hover:border-white/20 hover:bg-white/5 sm:flex sm:right-4"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          ◆ Projects · {String(selected + 1).padStart(2, "0")} / {String(heroReel.length).padStart(2, "0")}
        </div>
        <div className="flex items-center gap-1.5">
          {heroReel.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                autoplayRef.current.reset();
                embla?.scrollTo(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === selected ? "w-8 bg-foreground" : "w-3 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2 sm:hidden">
          <button onClick={scrollPrev} aria-label="Previous" className="glass-panel flex h-9 w-9 items-center justify-center rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={scrollNext} aria-label="Next" className="glass-panel flex h-9 w-9 items-center justify-center rounded-full">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSlide({
  video,
  active,
  onPlay,
}: {
  video: (typeof heroReel)[number];
  active: boolean;
  onPlay: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  // Спрощений та надійний контроль прев'ю
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (hover || active) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [hover, active]);

  const glowColor = video.glow ? video.glow.slice(0, 7) : "#a855f7";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPlay}
      className={`group relative aspect-[16/9] overflow-hidden rounded-3xl bg-black transition-all duration-700 cursor-pointer
        ${
          active
            ? "scale-100 opacity-100 border-[3.5px] sm:border-transparent"
            : "scale-[0.92] opacity-30 border-transparent pointer-events-none"
        }`}
      style={
        active && typeof window !== "undefined"
          ? {
              boxShadow: window.innerWidth >= 640 
                ? `0 0 40px 20px ${glowColor}55, 0 0 120px 150px ${glowColor}10` 
                : "none",
              borderColor: window.innerWidth < 640 ? `${glowColor}88` : undefined,
            }
          : undefined
      }
    >
      {/* Відео із преміальним зумом при наведенні */}
      <video
        ref={ref}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* М'яке затемнення фону */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-background/25 to-black/10 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Верхні плашки метаданих */}
      <div className="absolute top-5 left-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70 z-20">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        Live · Projects 2026
      </div>
      <div className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-widest text-white/70 z-20">
        {video.format}
      </div>

      {/* Контейнер кнопок (Кінематографічний Watch Project) */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        {/* Десктоп версія: ефект випливання */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          aria-label={`Open ${video.title}`}
          className="hidden md:flex pointer-events-auto items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl px-6 py-3 text-sm font-medium text-white shadow-2xl opacity-0 scale-90 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 hover:bg-white/15 hover:border-white/30"
        >
          <Play className="h-4 w-4 fill-current ml-0.5" />
          Watch Project
        </button>

        {/* Мобільна версія: тільки на активному слайді */}
        {active && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            aria-label={`Open ${video.title}`}
            className="flex md:hidden pointer-events-auto h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white shadow-2xl transition-all active:scale-95"
          >
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </button>
        )}
      </div>

      {/* Нижня інфо-плашка з дорожчим копірайтингом */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7 z-20 pointer-events-none">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </div>
          <h3 className="mt-1 truncate text-lg font-bold tracking-tight sm:text-2xl text-white">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}