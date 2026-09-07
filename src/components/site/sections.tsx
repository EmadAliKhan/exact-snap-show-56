import { ArrowRight, ArrowUpRight, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { CountUp, Icon, Reveal, SectionHeading } from "./primitives";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import logo from "@/assets/ary-services-logo-light.png.asset.json";
import {
  designServices,
  leadership,
  partners,
  services,
  solutions,
  techStack,
} from "@/lib/site-data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-24 text-ink-foreground"
    >
      <div className="grid-bg-dark absolute inset-0 opacity-70" />
      <HeroBackdrop />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[120px]" />
        <div
          className="animate-blob absolute -right-24 top-40 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="animate-blob absolute bottom-[-10rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-primary/15 blur-[120px]"
          style={{ animationDelay: "-11s" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="container-x relative z-10 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              ARY Services
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-7 text-balance text-[2.4rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
              Enterprise Technology Partner
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-[1.8] text-white/65 sm:text-lg">
              ARY Services drives digital transformation by building scalable platforms and
              technology solutions that deliver measurable business outcomes. From media and fintech
              to e-commerce and enterprise systems, we help businesses modernize infrastructure and
              create digital experiences that scale with growth.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#solutions"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--grad-brand)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] btn-press focus-ring transition-all duration-200 hover:shadow-[var(--shadow-glow)] sm:w-auto"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#companies"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur btn-press focus-ring transition-all duration-200 hover:border-primary/60 hover:bg-white/10 sm:w-auto"
              >
                Explore Our Client
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { icon: "Rocket", value: 500, suffix: "+", label: "Projects Delivered" },
  { icon: "HeartHandshake", value: 20, suffix: "k+", label: "Happy Clients" },
  { icon: "Users", value: 150, suffix: "+", label: "Team Experts" },
  { icon: "CalendarClock", value: 20, suffix: "+", label: "Years Experience" },
];

export function Impact() {
  return (
    <section id="impact" className="section-y relative overflow-hidden">
      <div className="dot-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Impact"
          heading="Numbers That Speak"
          subtext="Two decades of building digital products that transform industries and drive measurable results."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="card-lift group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-[0_1px_2px_oklch(0%_0_0_/_0.04)] backdrop-blur">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <div className="mt-6 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
                  <span className="text-gradient">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
      {children}
    </span>
  );
}

export function Services() {
  return (
    <section id="services" className="section-alt section-y relative overflow-hidden">
      <div className="circuit-accent pointer-events-none absolute -right-24 top-10 h-[26rem] w-[26rem] opacity-40" />
      <div className="circuit-accent pointer-events-none absolute -left-24 bottom-10 h-[22rem] w-[22rem] opacity-30" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Services"
          heading="What We Build"
          subtext="From concept to deployment — we provide end-to-end digital solutions engineered to scale your business."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              {s.featured ? (
                <article className="group relative h-full rounded-2xl border border-border border-t-4 border-t-primary bg-ink p-7 text-ink-foreground shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] md:-translate-y-4">
                  <FeaturedBadge>Core Service</FeaturedBadge>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {s.description}
                  </p>
                </article>
              ) : (
                <article className="card-lift group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-7 backdrop-blur">
                  <div className="absolute inset-x-0 -top-24 h-40 bg-[image:var(--grad-brand)] opacity-0 blur-[70px] transition-opacity duration-300 group-hover:opacity-25" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </article>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="section-dark section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-24 h-[26rem] w-[26rem] rounded-full bg-primary/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Our Solutions"
          heading="Our Suite of Digital Products & Solutions"
          subtext="End-to-end digital solutions tailored for every industry — from fintech to entertainment, we build what scales."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 80}>
              {s.featured ? (
                <a
                  href="#contact"
                  className="group relative flex h-full flex-col rounded-2xl border border-t-4 border-white/10 border-t-primary bg-[image:var(--grad-brand)] p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] md:-translate-y-4"
                >
                  <FeaturedBadge>Core Solution</FeaturedBadge>
                  <span className="flex h-full flex-col rounded-2xl bg-ink p-6 text-ink-foreground">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className="mt-4 block text-sm leading-relaxed text-white/70">
                      {s.description}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Talk to us
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </a>
              ) : (
                <a
                  href="#contact"
                  className="card-dark group flex h-full flex-col rounded-2xl p-6 text-ink-foreground"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    {s.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Talk to us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function MarqueeRow({
  items,
  reverse,
}: {
  items: readonly { name: string; slug?: string; icon?: string; color?: string }[];
  reverse?: boolean;
}) {
  const list = [...items, ...items];
  return (
    <div className="marquee-wrap overflow-hidden">
      <div
        className={`marquee-track gap-4 ${reverse ? "reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: reverse ? "48s" : "40s" }}
      >
        {list.map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {"slug" in t && t.slug ? (
              <img
                src={`https://cdn.simpleicons.org/${t.slug}${"color" in t && t.color ? `/${t.color}` : ""}`}
                alt={`${t.name} logo`}
                loading="lazy"
                className="h-5 w-5"
              />
            ) : (
              <Icon name={"icon" in t && t.icon ? t.icon : "Code2"} className="h-5 w-5 text-primary" />
            )}
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-14">
      <div className="relative space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">

        <MarqueeRow items={techStack} />
        <MarqueeRow items={[...techStack].reverse()} reverse />
      </div>
    </section>
  );
}

export function Companies() {
  return (
    <section id="companies" className="section-alt section-y relative overflow-hidden">
      <div className="dot-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Partners"
          heading="Companies We Work With"
          subtext="Trusted by leading brands and innovative startups across the globe to deliver exceptional digital experiences."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 100}>
              {p.featured ? (
                <article className="group relative flex h-full flex-col rounded-2xl border border-border border-t-4 border-t-primary bg-ink p-6 text-ink-foreground shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] md:-translate-y-4">
                  <FeaturedBadge>Flagship Partner</FeaturedBadge>
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--grad-brand)] text-sm font-bold text-primary-foreground">
                      {p.initials}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{p.name}</h3>
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                    {p.description}
                  </p>
                  <a
                    href={`https://${p.site}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Visit Website
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </article>
              ) : (
                <article className="card-lift group flex h-full flex-col rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--grad-brand)] text-sm font-bold text-primary-foreground">
                      {p.initials}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{p.name}</h3>
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <a
                    href={`https://${p.site}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Visit Website
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </article>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Design() {
  return (
    <section id="design" className="section-dark section-y relative overflow-hidden">
      <div className="dot-bg-dark pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Graphics & Design"
          heading="Design That Inspires"
          subtext="Creative design solutions that bring your brand to life — from striking logos to immersive product experiences."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {designServices.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 100}>
              {d.featured ? (
                <article className="group relative h-full rounded-2xl border border-t-4 border-white/10 border-t-primary bg-[image:var(--grad-brand)] p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] md:-translate-y-4">
                  <FeaturedBadge>Popular</FeaturedBadge>
                  <div className="h-full rounded-2xl bg-ink p-7 text-ink-foreground">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon name={d.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{d.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {d.description}
                    </p>
                  </div>
                </article>
              ) : (
                <article className="card-dark group h-full rounded-2xl p-7 text-ink-foreground">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon name={d.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{d.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {d.description}
                  </p>
                </article>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-ink-foreground">Let's Design Together</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                Have a design project in mind? Our creative team is ready to bring your vision to
                life.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--grad-brand)] px-7 py-3.5 text-sm font-semibold text-primary-foreground btn-press focus-ring"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


export function Leadership() {
  return (
    <section id="leadership" className="section-warm section-y relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Leadership"
          heading="Meet Our Management"
          subtext="A team of seasoned leaders driving innovation and excellence with decades of combined experience."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {leadership.map((l, i) => (
            <Reveal key={l.name} delay={i * 120}>
              <article className="card-lift group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-[0_1px_2px_oklch(0%_0_0_/_0.04)] backdrop-blur">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[image:var(--grad-brand)] p-[2px]">
                  <span className="grid h-full w-full place-items-center rounded-full bg-surface-2 text-2xl font-bold text-primary">
                    {l.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{l.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {l.title}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{l.bio}</p>
                {l.linkedin && (
                  <a
                    href={l.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${l.name} on LinkedIn`}
                    className="mt-5 inline-grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="grid-bg-dark absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
        <div
          className="animate-blob absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-primary/20 blur-[120px]"
          style={{ animationDelay: "-8s" }}
        />
      </div>
      <div className="container-x relative section-y">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-5xl">
              Ready to Build Something <span className="text-gradient">Extraordinary?</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Let's turn your vision into a market-leading digital product. Our team of experts is
              ready to craft the perfect solution for your business. Have a query or concern? Feel
              free to email us, we're here to help.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <a
              href="mailto:info@aryservices.com"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[image:var(--grad-brand)] px-8 py-4 text-sm font-semibold text-primary-foreground btn-press focus-ring transition-all duration-200 hover:shadow-[var(--shadow-glow)]"
            >
              <Mail className="h-4 w-4" />
              info@aryservices.com
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const quickLinks = ["Home", "About Us", "Solutions", "Companies", "Design", "Contact"];
const footerServices = [
  "Mobile Development",
  "Web Development",
  "Cloud & DevOps",
  "AI & Machine Learning",
  "UI/UX Design",
  "Cybersecurity",
];
const socials = ["Linkedin", "Twitter", "Facebook", "Instagram"];
const anchors: Record<string, string> = {
  Home: "#home",
  "About Us": "#impact",
  Solutions: "#solutions",
  Companies: "#companies",
  Design: "#design",
  Contact: "#contact",
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-ink-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo.url} alt="ARY Services" className="h-9 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Premium software solutions crafted with years of expertise. We build digital products
            that transform businesses and delight users worldwide.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s}
                href="#contact"
                aria-label={s}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
              >
                <Icon name={s} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l}>
                <a
                  href={anchors[l]}
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {footerServices.map((l) => (
              <li key={l}>
                <a
                  href="#services"
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:info@aryservices.com"
                className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" /> info@aryservices.com
              </a>
            </li>
            <li>
              <a
                href="tel:+923333184189"
                className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" /> +92 333 3184189
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <span>© 2026 ARY Services. All rights reserved.</span>
          <span>Crafted with passion</span>
        </div>
      </div>
    </footer>
  );
}
