import { ArrowRight, Check } from "lucide-react";
import aboutImage from "@/assets/about-packing.jpg";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";
import { BrandLink } from "@/components/BrandButton";

export function About() {
  const { t, dir } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 lg:py-32">
      <div className="container-hayya grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">{t.about.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[2.9rem]">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.about.body}</p>
          <ul className="mt-8 space-y-3">
            {t.about.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-navy/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" strokeWidth={2.4} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <BrandLink href="/#contact" variant="outline" className="mt-9">
            {t.about.cta}
            <ArrowRight className={dir === "rtl" ? "h-4 w-4 rotate-180" : "h-4 w-4"} />
          </BrandLink>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="absolute -inset-3 -z-10 border border-gold/35" aria-hidden="true" />
          <img
            src={aboutImage}
            alt="Fresh produce being sorted and graded in a packing facility"
            width={1280}
            height={1600}
            loading="lazy"
            className="aspect-4/5 w-full object-cover shadow-lift"
          />
        </Reveal>
      </div>
    </section>
  );
}
