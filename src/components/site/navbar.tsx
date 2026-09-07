import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-white/80 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-x flex h-18 items-center justify-between py-4">
        <a
          href="#home"
          className={cn(
            "group flex items-center gap-3",
            scrolled ? "text-foreground" : "text-white",
          )}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--grad-brand)] text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-105">
            AS
          </span>
          <span className="text-base font-semibold tracking-tight">ARY Services</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/70 hover:text-white",
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 rounded-full bg-[image:var(--grad-brand)] px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.04]"
          >
            Get in Touch
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg border lg:hidden",
            scrolled ? "border-border text-foreground" : "border-white/20 text-white",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          className={cn(
            "lg:hidden",
            scrolled ? "border-b border-border bg-white/95 backdrop-blur-xl" : "bg-ink/95 backdrop-blur-xl",
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
                  scrolled
                    ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
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
