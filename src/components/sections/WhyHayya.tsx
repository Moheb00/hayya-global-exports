import { Handshake, BadgeCheck, MessagesSquare, Boxes, Wheat, Infinity as InfinityIcon } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";

const icons = [Handshake, BadgeCheck, MessagesSquare, Boxes, Wheat, InfinityIcon];

export function WhyHayya() {
  const { t } = useLanguage();

  return (
    <section id="why" className="border-y border-border bg-secondary py-20 md:py-28 lg:py-32">
      <div className="container-hayya">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.why.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[2.9rem]">
            {t.why.title}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = icons[i] ?? Handshake;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 3) * 90}
                className="group border border-border bg-card p-7 transition-all duration-400 hover:-translate-y-1 hover:border-navy/25 hover:shadow-soft"
              >
                <span className="grid h-11 w-11 place-items-center border border-gold/40 bg-gold/10 text-gold transition-colors duration-400 group-hover:bg-gold group-hover:text-navy-deep">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
