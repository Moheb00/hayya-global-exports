import { FileSignature } from "lucide-react";
import { partners } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";

export function Partnerships() {
  const { t, lang } = useLanguage();

  return (
    <section id="partnerships" className="py-20 md:py-28 lg:py-32">
      <div className="container-hayya grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{t.partnerships.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[2.9rem]">
            {t.partnerships.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.partnerships.body}
          </p>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2">
          {partners.map((partner, i) => (
            <Reveal
              as="li"
              key={partner.id}
              delay={i * 110}
              className="flex flex-col border border-border bg-card p-7 transition-all duration-400 hover:border-gold/50 hover:shadow-soft"
            >
              <FileSignature className="h-5 w-5 text-gold" strokeWidth={1.6} />
              {/* Text-based presentation — no third-party logos are used. */}
              <h3 className="mt-5 font-display text-2xl text-navy">
                {lang === "ar" ? partner.nameAr : partner.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {partner[lang]}
              </p>
              <p className="mt-6 border-t border-border pt-4 text-[0.7rem] font-semibold tracking-[0.16em] text-navy/50 uppercase">
                {t.partnerships.note}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
