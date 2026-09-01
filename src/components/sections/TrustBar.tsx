import { Sprout, ShieldCheck, Truck, Globe2 } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";

const icons = [Sprout, ShieldCheck, Truck, Globe2];

export function TrustBar() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border bg-card">
      <div className="container-hayya grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {t.trust.map((item, i) => {
          const Icon = icons[i] ?? Sprout;
          return (
            <Reveal
              key={item.title}
              delay={i * 80}
              className="border-border px-1 py-9 sm:px-7 lg:not-first:border-s"
            >
              <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
              <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
