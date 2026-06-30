import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Clock, Monitor, Wand2 } from "lucide-react";
import type { VideoWork } from "@/lib/work-data";

export function VideoModal({
  video,
  onClose,
}: {
  video: VideoWork | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 px-4 py-6 backdrop-blur-2xl sm:px-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_30px_120px_-20px_oklch(0.55_0.25_280_/_0.5)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground backdrop-blur transition-all hover:scale-105 hover:border-neon/60 hover:bg-neon/10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col">
              {/* Плеєр */}
              <div className="relative w-full bg-black aspect-video">
                <video
                  key={video.id}
                  src={video.src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Інформація про проєкт */}
              <div className="flex flex-col gap-8 p-6 sm:p-8">
                {/* Головна інфа: Назва + Опис під нею */}
                <div className="space-y-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    ◆ Selected Work
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {video.title}
                  </h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-foreground/80 pt-1">
                    {video.description}
                  </p>
                </div>

                {/* Нижня сітка мета-даних */}
                <div className="grid grid-cols-1 gap-6 border-t border-border/60 pt-6 sm:grid-cols-3">
                  <Meta icon={<Monitor className="h-4 w-4" />} label="Format">
                    <span className="text-sm font-medium text-foreground/90">{video.format}</span>
                  </Meta>
                  
                  <Meta icon={<Wand2 className="h-4 w-4" />} label="Software">
                    {/* Тепер софт йде гарним вертикальним списком */}
                    <div className="flex flex-col items-start gap-1.5 w-full">
                      {video.software.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] font-medium text-foreground block w-fit"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Meta>
                  
                  <Meta icon={<Clock className="h-4 w-4" />} label="Delivery">
                    <span className="text-sm font-medium text-foreground/90">{video.deliveryTime}</span>
                  </Meta>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    // items-start гарантує, що контент буде вирівняний по лівому краю
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-neon">{icon}</span>
        {label}
      </div>
      {/* Контент блоку завжди починається з однієї лінії */}
      <div className="w-full flex flex-col items-start">{children}</div>
    </div>
  );
}