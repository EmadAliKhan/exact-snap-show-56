import { useEffect, useRef, useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Lucide = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <Lucide className={className} aria-hidden="true" />;
}

export function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  heading: string;
  subtext: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary",
            dark
              ? "border border-white/15 bg-white/5 backdrop-blur"
              : "border border-border bg-secondary/60",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[3.15rem]">
          {heading}
        </h2>
      </Reveal>
      <Reveal delay={170}>
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-[1.75] sm:text-[1.0625rem]",
            dark ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {subtext}
        </p>
      </Reveal>
    </div>
  );
}


export function CountUp({
  to,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
