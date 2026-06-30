import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
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
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplayRef.current]
  );

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => setSelected(embla.selectedScrollSnap());

    embla.on("select", onSelect);
    embla.on("reInit", onSelect);

    setSelected(embla.selectedScrollSnap());

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    const autoplay = autoplayRef.current;

    if (isVideoOpen) autoplay.stop();
    else autoplay.play();
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
          className="glass-panel absolute top-1/2 left-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full sm:flex"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          onClick={scrollNext}
          className="glass-panel absolute top-1/2 right-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full sm:flex"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          ◆ Projects · {String(selected + 1).padStart(2, "0")} /{" "}
          {String(heroReel.length).padStart(2, "0")}
        </div>

        <div className="flex items-center gap-1.5">
          {heroReel.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                autoplayRef.current.reset();
                embla?.scrollTo(i);
              }}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === selected
                  ? "w-7 bg-foreground"
                  : "w-2.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 sm:hidden">
          <button
            onClick={scrollPrev}
            className="glass-panel flex h-8 w-8 items-center justify-center rounded-full"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={scrollNext}
            className="glass-panel flex h-8 w-8 items-center justify-center rounded-full"
          >
            <ArrowRight className="h-3.5 w-3.5" />
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
  titleSize = "text-sm sm:text-lg md:text-xl",
  metaText = "Live · 2026",
}: {
  video: (typeof heroReel)[number];
  active: boolean;
  onPlay: () => void;
  titleSize?: string;
  metaText?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (hover || active) el.play().catch(() => {});
    else el.pause();
  }, [hover, active]);

  const glowColor = video.glow ? video.glow.slice(0, 7) : "#a855f7";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPlay}
      className={`group relative aspect-[16/9] overflow-hidden rounded-3xl bg-black cursor-pointer transition-all duration-700
        ${
          active
            ? "scale-100 opacity-100 border-[3px]"
            : "scale-[0.92] opacity-30 pointer-events-none"
        }`}
      style={
        active
         ? {
              boxShadow: window.innerWidth >= 640 
                ? `0 0 40px 20px ${glowColor}55, 0 0 120px 150px ${glowColor}10` 
                : "none",
              borderColor: window.innerWidth < 640 ? `${glowColor}88` : undefined,
            }
          : undefined
      }
    >
      <video
        ref={ref}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/10" />

      <div className="absolute top-2 left-4 flex items-center gap-2 font-mono text-[9px] sm:text-[15px] uppercase tracking-widest text-white/70">
        <span className="h-1 w-1 animate-pulse rounded-full bg-red-500" />
        {metaText}
      </div>

      <div className="absolute top-2 right-4 font-mono text-[9px] sm:text-[15px] uppercase tracking-widest text-white/70">
        {video.format}
      </div>

      {active && (
  <div className="absolute inset-0 z-10 hidden items-center justify-center group-hover:flex">
    <span className="glass-panel flex items-center gap-2 rounded-full bg-black/40 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
      <Play className="h-3.5 w-3.5 fill-current" />
      Watch Project
    </span>
  </div>
)}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4 pb-2 pointer-events-none ">
        <div className="min-w-0">
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </div>
          <h3
            className={`mt-1 truncate font-bold tracking-tight text-white text-sm sm:text-3xl leading-tight ${titleSize}`}
          >
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}