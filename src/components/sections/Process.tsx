import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="container-hayya">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.process.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[2.9rem]">
            {t.process.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.process.sub}</p>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-8">
          {/* timeline rail: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute start-[0.4rem] top-2 bottom-2 w-px bg-border md:start-0 md:top-[0.45rem] md:h-px md:w-full"
          />
          {t.process.steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 110} className="relative ps-8 md:ps-0 md:pt-10">
              <span
                aria-hidden="true"
                className="absolute start-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold bg-background md:top-0"
              />
              <span className="font-display text-sm font-bold tracking-[0.2em] text-gold">
                {step.n}
              </span>
              <h3 className="mt-3 text-xl text-navy">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
