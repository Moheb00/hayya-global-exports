import { company } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";
import { BrandLink } from "@/components/BrandButton";

export function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border bg-secondary py-20 md:py-24">
      <div className="container-hayya">
        <Reveal className="relative overflow-hidden border border-gold/40 bg-card px-7 py-14 text-center md:px-16 md:py-20">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gold"
          />
          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.16] text-navy sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.cta.body}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <BrandLink href="/#contact" variant="solid" size="lg">
              {t.cta.primary}
            </BrandLink>
            <BrandLink href={`mailto:${company.email}`} variant="outline" size="lg">
              {t.cta.secondary}
            </BrandLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
