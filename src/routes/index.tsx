import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/work-data";
import { HeroCarousel } from "@/components/hero-carousel";
import { VideoModal } from "@/components/video-modal";
import { SocialLinks } from "@/components/social-links";
import { heroReel } from "@/lib/work-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valentyn Lavryk — Brand Motion Designer" },
      { name: "description", content: "Portfolio of Valentyn Lavryk — high-end 2D brand motion designer." },
    ],
  }),
  component: Index,
});

const marqueeItems = [
  "2D LOGO ANIMATION",
  "KINETIC TYPOGRAPHY",
  "VISUAL BRANDING",
  "MOTION SYSTEMS",
  "LOTTIE",
];

function Index() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <AmbientGlow />
      <Nav />
      <Hero onPlay={(i) => setModalIndex(i)} isVideoOpen={modalIndex !== null} />
      <Marquee />
      <Work />
      <Marquee reverse />
      <SocialMedia />
      <Contact />
      <Footer />
      <VideoModal
        video={modalIndex !== null ? heroReel[modalIndex] : null}
        onClose={() => setModalIndex(null)}
      />
    </div>
  );
}

function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-glow-purple/30 blur-[140px]" />
      <div className="absolute top-[40%] -left-40 h-[500px] w-[500px] rounded-full bg-glow-blue/25 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-glow-purple/20 blur-[180px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[min(100%-1rem,720px)] -translate-x-1/2"
    >
      <nav className="glass-panel flex items-center gap-2 rounded-full px-2 py-2 pl-5 sm:gap-4">
        {/* Загорнули VL. у загальний клас градієнта */}
        <a href="#top" className="text-base font-bold tracking-tight text-gradient">
          VL.
        </a>
        <div className="hidden h-4 w-px bg-border sm:block" />
        <div className="flex flex-1 items-center justify-center gap-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
          {[
            { label: "Work", href: "#work" },
            { label: "Social Media", href: "#socialmedia" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden h-4 w-px bg-border sm:block" />
        <SocialLinks className="hidden sm:flex" />
      </nav>
    </motion.header>
  );
}

function Hero({ onPlay, isVideoOpen }: { onPlay: (i: number) => void; isVideoOpen: boolean }) {
  return (
    <section id="top" className="relative z-10 px-4 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_oklch(0.78_0.18_260)]" />
          Available · 2026
        </motion.div>

        <div className="font-sans">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold tracking-[-0.01em] text-foreground/90"
          >
            Valentyn Lavryk //
          </motion.div>

          <h1 className="text-[clamp(2.75rem,8vw,7.5rem)] font-extrabold leading-[1.0] tracking-[-0.04em]">
            {["BRAND MOTION", "DESIGNER"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {i === 0 ? <span className="text-gradient">{word}</span> : word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground"
        >
          Hi, I'm Valentyn.
          I craft expressive logo animations and motion graphics for ambitious brands — identity reveals, kinetic type, and signature moments built frame-by-frame.
        </motion.p>

        <HeroCarousel onPlay={onPlay} isVideoOpen={isVideoOpen} />
      </div>
    </section>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="relative z-10 overflow-hidden border-y border-border/60 bg-background/40 py-6 backdrop-blur sm:py-8">
      <div
        className="animate-marquee flex shrink-0 gap-12 whitespace-nowrap font-mono text-2xl font-medium uppercase tracking-tight sm:text-4xl"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className={i % 2 === 0 ? "text-foreground" : "text-muted-foreground"}>
              {item}
            </span>
            <Sparkles className="h-5 w-5 text-neon" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const pt = "pt-0 md:pt-4";
  const pb = "pb-12 md:pb-32";
  const gridRows = "auto-rows-[200px] md:auto-rows-[280px]";

  return (
    <section id="work" className={`relative z-10 px-4 ${pt} ${pb} scroll-mt-[20px]`}>
      <div className="mx-auto max-w-7xl pt-4 sm:pt-6">
        <div className="mb-12 flex items-end justify-between sm:mb-16">
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ◆ Selected Work
            </div>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-6xl">
              Motion that <span className="text-gradient">moves brands.</span>
            </h2>
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-3 md:grid-cols-3 ${gridRows} sm:gap-5`}>
          {categories.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof categories)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={project.span}
    >
      <Link
        to="/work/$category"
        params={{ category: project.slug }}
        className={`group glass-panel relative flex h-full min-h-[180px] flex-col justify-between gap-0 overflow-hidden rounded-3xl p-5 transition-transform duration-500 hover:scale-[1.015] sm:min-h-[280px] sm:p-5`}
      >
        <img
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        {/* Глибоке затемнення знизу для чіткого зчитування плашок */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950/95 via-neutral-900/40 to-transparent opacity-95" />

        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${project.hue} opacity-20 transition-opacity duration-700 group-hover:opacity-40`}
        />
        <div className="absolute inset-0 -z-10 transition-all duration-700 group-hover:backdrop-blur-sm" />

        <div className="flex items-start justify-between">
          {/* Тег: на мобільних text-[9px] і менший трекінг, на десктопі text-[11px] */}
          <span className="font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-300 transition-colors group-hover:text-zinc-400 sm:text-[11px] sm:tracking-[0.2em]">
            {project.tag}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-400 transition-all duration-500 group-hover:rotate-45 group-hover:border-white/40 group-hover:text-white sm:h-9 sm:w-9">
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </div>

        <div className="mb-1 sm:mb-2">
          {/* Головний заголовок: на мобільних text-xl, на десктопі text-3xl */}
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {project.title}
          </h3>

          {/* Опис: на мобільних text-[11px] з меншим відступом зверху (mt-1.5) */}
          <p className="mt-3 font-mono text-[11px] font-normal leading-relaxed text-zinc-300 max-w-[95%] sm:mt-5 sm:text-sm sm:max-w-[90%]">
            {project.desc}
          </p>

          {/* Кнопка дії: на мобільних mt-3 та text-[9px] */}
          <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.20em] text-zinc-400
           transition-colors duration-300 group-hover:text-white sm:mt-4 sm:text-[11px] sm:tracking-[0.2em]">
            View {project.videos.length} works
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SocialMedia() {
  const servicesList = [
    {
      title: "Instagram",
      desc: "Expressive 2D logo reveals and signature brand moments built frame-by-frame.",
      href: "https://www.instagram.com/valentyn.motion/",
    },
    {
      title: "Telegram",
      desc: "Dynamic text layouts and rhythmic animations tailored for modern video platforms.",
      href: "https://t.me/valentyn_motion",
    },
    {
      title: "TikTok",
      desc: "Engaging short-form videos and trending effects designed to captivate your audience.",
      href: "https://www.tiktok.com/@valentyn.motion",
    },
    {
      title: "Fiverr",
      desc: "Engaging short-form videos and trending effects designed to captivate your audience.",
      href: "https://www.fiverr.com/design_by_vl",
    },
  ];

  return (
    <section id="socialmedia" className="relative z-10 px-4 pt-0 pb-24 sm:pb-32 scroll-mt-[30px]">
      <div className="mx-auto max-w-7xl pt-4 sm:pt-6">
        <div className="mb-12">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ◆ Channels
          </div>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-6xl">
            Motion <span className="text-gradient">Social media.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => (
            <a
              key={service.title}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-panel block rounded-3xl p-6 transition-all duration-500 hover:scale-[1.015] hover:border-neon/40 hover:bg-white/5"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold transition-colors group-hover:text-neon">
                  {service.title}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/80 transition-all duration-500 group-hover:rotate-45 group-hover:border-foreground/60 group-hover:bg-foreground/5">
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
                {service.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const BOT_TOKEN = "8930330043:AAGSqIa_p2un_1R5pWk1xmXKvJEyydfMFPg";
  const CHAT_ID = "1362115229";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "706da5a1-0b27-4e1d-a028-600f466d6ff9");

    const name = formData.get("name")?.toString() || "Не вказано";
    const email = formData.get("email")?.toString() || "Не вказано";
    const message = formData.get("project")?.toString() || "Не вказано";

    try {
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const web3Data = await web3Response.json();

      const tgText = `🚀 Нова заявка з портфоліо!\n\n👤 Ім'я: ${name}\n📧 Email: ${email}\n📝 Повідомлення: ${message}`;

      const tgParams = new URLSearchParams({
        chat_id: CHAT_ID,
        text: tgText
      });

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?${tgParams.toString()}`, {
        method: "POST"
      });

      if (web3Data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Помилка відправки:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 px-4 pt-32 pb-16 sm:pt-40 sm:pb-24 min-h-[90vh] flex flex-col justify-center scroll-mt-[-60px] sm:scroll-mt-[-110px]"
    >
      <div className="mx-auto max-w-5xl w-full pt-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center text-[clamp(2.25rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em] sm:mb-20"
        >
          LET'S BUILD <br />
          <span className="text-gradient">SOMETHING EXTRAORDINARY.</span>
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="glass-panel mx-auto max-w-2xl rounded-3xl p-6 sm:p-10"
        >
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            ◆ Start a Project
          </div>

          <div className="space-y-5">
            <Field label="Name" name="name" type="text" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="hello@email.com" />
            <Field
              label="Project"
              name="project"
              type="textarea"
              placeholder="Tell me about your project, what you need animated, your goals, or any ideas you'd like to share..."
              className="min-h-[120px]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="animate-gradient group relative mt-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-glow-blue to-glow-purple py-4 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-95 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {status === "submitting" && "Sending..."}
              {status === "success" && "Message sent ✓"}
              {status === "error" && "Error! Try again"}
              {status === "idle" && "Send Message"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  className?: string;
}) {
  const base =
    "peer w-full rounded-xl border border-border bg-background/40 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 outline-none focus:border-neon focus:bg-background/60 focus:shadow-[0_0_0_4px_oklch(0.55_0.22_260_/_0.15),0_0_30px_-5px_oklch(0.6_0.22_280_/_0.5)]";

  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea name={name} placeholder={placeholder} rows={4} className={`${base} ${className || ""}`} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 px-4 py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:text-xs sm:tracking-[0.2em]">
        <span>© 2026 Valentyn Lavryk ◆ Motion Designer</span>
      </div>
    </footer>
  );
}