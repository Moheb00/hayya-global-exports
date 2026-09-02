import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/language";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { WhyHayya } from "@/components/sections/WhyHayya";
import { Partnerships } from "@/components/sections/Partnerships";
import { GlobalMarkets } from "@/components/sections/GlobalMarkets";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const title = "HAYYA | Egyptian Agricultural Products Export";
const description =
  "HAYYA is an Egyptian agricultural export company connecting quality-focused Egyptian produce with international B2B buyers and global markets.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "HAYYA",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "El Shorouk City",
            addressCountry: "EG",
          },
          telephone: "+20 10 60010040",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <h1 className="sr-only">HAYYA — Egyptian Agricultural Products Export</h1>
        <Hero />
        <TrustBar />
        <About />
        <Products />
        <Process />
        <WhyHayya />
        <Partnerships />
        <GlobalMarkets />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
