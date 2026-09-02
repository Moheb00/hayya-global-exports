import heroImage from "@/assets/hero-field.jpg";
import { useLanguage } from "@/lib/language";
import { BrandLink } from "@/components/BrandButton";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      <img
        src={heroImage}
        alt="Egyptian agricultural field at sunrise"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, oklch(0.21 0.05 254 / 0.94) 0%, oklch(0.21 0.05 254 / 0.72) 45%, oklch(0.21 0.05 254 / 0.42) 100%)",
        }}
      />

      <div className="container-hayya pt-36 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-5 text-[2.5rem] leading-[1.06] text-on-navy sm:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-navy-muted sm:text-lg">
            {t.hero.sub}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BrandLink href="#contact" variant="gold" size="lg" className="w-full sm:w-auto">
              {t.hero.primary}
            </BrandLink>
            <BrandLink href="#products" variant="ghostLight" size="lg" className="w-full sm:w-auto">
              {t.hero.secondary}
            </BrandLink>
          </div>
          <p className="mt-8 border-t border-on-navy/20 pt-5 text-xs font-semibold tracking-[0.16em] text-on-navy/70 uppercase">
            {t.hero.trust}
          </p>
        </div>
      </div>
    </section>
  );
}
