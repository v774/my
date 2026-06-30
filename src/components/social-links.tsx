import { Instagram, Send } from "lucide-react";
import { socials } from "@/lib/work-data";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M19.6 6.7a5.6 5.6 0 0 1-3.3-1.1 5.6 5.6 0 0 1-2.2-3.6h-3.2v13.2a2.6 2.6 0 1 1-1.9-2.5V9.4a5.8 5.8 0 1 0 5.1 5.8V9.4a8.8 8.8 0 0 0 5.5 1.9z"/>
    </svg>
  );
}

function FiverrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 9h-5.5a1 1 0 0 0-1 1v6H13v-6a1 1 0 0 0-1-1H9.2c0-.9.5-1.4 1.5-1.4H12V5h-1.6c-3 0-4.6 1.6-4.6 4.6V9H3v3h2.8v7h3.4v-7h3.4v7H19v-7h2V9z"/>
    </svg>
  );
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  instagram: ({ className }) => <Instagram className={className} />,
  telegram: ({ className }) => <Send className={className} />,
  tiktok: TikTokIcon,
  fiverr: FiverrIcon,
};

export function SocialLinks({
  size = "sm",
  className =""

}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const btn =
    size === "lg"
      ? "h-11 w-11 sm:h-12 sm:w-12"
      : "h-8 w-8 sm:h-9 sm:w-9";
  const icon = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {socials.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            title={s.name}
            className={`${btn} group flex items-center justify-center rounded-full border border-border/70 bg-background/30 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-neon/60 hover:bg-neon/10 hover:text-foreground hover:shadow-[0_0_18px_-2px_oklch(0.6_0.22_280_/_0.6)]`}
          >
            <Icon className={`${icon} transition-transform duration-300 group-hover:scale-110`} />
          </a>
        );
      })}
    </div>
  );
}
