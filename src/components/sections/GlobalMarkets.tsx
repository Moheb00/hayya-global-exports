import portImage from "@/assets/export-port.jpg";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";
import { BrandLink } from "@/components/BrandButton";

export function GlobalMarkets() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-24 md:py-32">
      <img
        src={portImage}
        alt="Container port at dusk"
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 20%, oklch(0.21 0.05 254 / 0.72) 0%, oklch(0.21 0.05 254 / 0.95) 70%)",
        }}
      />
      {/* Subtle global network motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 400"
        className="pointer-events-none absolute end-0 bottom-0 -z-10 h-[70%] w-auto opacity-25"
      >
        <g fill="none" stroke="oklch(0.755 0.13 76)" strokeWidth="0.8">
          <ellipse cx="400" cy="200" rx="190" ry="190" />
          <ellipse cx="400" cy="200" rx="190" ry="70" />
          <ellipse cx="400" cy="200" rx="80" ry="190" />
          <path d="M210 200h380M400 10v380" />
          <path d="M400 200 C 330 120, 250 130, 232 150" strokeDasharray="4 5" />
          <path d="M400 200 C 480 130, 560 160, 575 190" strokeDasharray="4 5" />
          <path d="M400 200 C 420 280, 480 300, 520 300" strokeDasharray="4 5" />
        </g>
        <g fill="oklch(0.755 0.13 76)">
          <circle cx="400" cy="200" r="4" />
          <circle cx="232" cy="150" r="3" />
          <circle cx="575" cy="190" r="3" />
          <circle cx="520" cy="300" r="3" />
        </g>
      </svg>

      <div className="container-hayya">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.global.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.12] text-on-navy sm:text-4xl lg:text-5xl">
            {t.global.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-on-navy-muted">{t.global.body}</p>
          <BrandLink href="/#contact" variant="gold" size="lg" className="mt-9">
            {t.global.cta}
          </BrandLink>
        </Reveal>
      </div>
    </section>
  );
}
