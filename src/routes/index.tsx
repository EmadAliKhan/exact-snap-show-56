import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import {
  Companies,
  Design,
  FinalCta,
  Footer,
  Hero,
  Impact,
  Leadership,
  Services,
  Solutions,
  TechMarquee,
} from "@/components/site/sections";

const title = "ARY Services — Digital Transformation & Software Solutions";
const description =
  "ARY Services builds scalable platforms, fintech, OTT, e-commerce and enterprise systems that deliver measurable business outcomes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Services />
        <Solutions />
        <TechMarquee />
        <Companies />
        <Design />
        <Leadership />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
