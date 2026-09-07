import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/ary-services-logo-light.png.asset.json";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#impact" },
  { label: "Solutions", href: "#solutions" },
  { label: "Companies", href: "#companies" },
  { label: "Design", href: "#design" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);


  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink/75 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        className={cn(
          "container-x flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <a
          href="#home"
          className="group flex items-center gap-3"
        >
          <img
            src={logo.url}
            alt="ARY Services"
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-9"
          />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
                "text-white/70 hover:text-white",
              )}
            >
              {l.label}
              <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-[image:var(--grad-brand)] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 rounded-full bg-[image:var(--grad-brand)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-14px_rgba(0,0,0,0.9)] btn-press focus-ring hover:shadow-[var(--shadow-glow)]"
          >
            Get in Touch
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg border transition-colors duration-200 hover:border-primary/60 lg:hidden",
            "border-white/20 text-white",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          className={cn(
            "lg:hidden",
            "border-b border-white/10 bg-ink/95 backdrop-blur-xl",
          )}
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
