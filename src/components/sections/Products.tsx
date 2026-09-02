import { ArrowRight } from "lucide-react";
import { products } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";

export function Products() {
  const { t, lang, dir } = useLanguage();

  return (
    <section id="products" className="border-y border-border bg-secondary py-20 md:py-28 lg:py-32">
      <div className="container-hayya">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.products.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[2.9rem]">
            {t.products.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.products.sub}</p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const local = product[lang];
            return (
              <Reveal
                as="li"
                key={product.id}
                delay={(i % 3) * 90}
                className="group border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={local.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-navy">{local.name}</h3>
                  <p className="mt-2.5 min-h-16 text-sm leading-relaxed text-muted-foreground">
                    {local.desc}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-navy uppercase transition-colors hover:text-gold"
                  >
                    {t.products.cta}
                    <ArrowRight
                      className={
                        dir === "rtl"
                          ? "h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1"
                          : "h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      }
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
