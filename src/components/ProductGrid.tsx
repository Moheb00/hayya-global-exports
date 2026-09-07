import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/lib/language";
import { catalogCopy } from "@/content/site";
import { localDesc, localName, type ProductWithImage } from "@/lib/catalog";

export function ProductGrid({
  products,
  ctaHref = "/#contact",
}: {
  products: ProductWithImage[];
  ctaHref?: string;
}) {
  const { lang, dir } = useLanguage();
  const c = catalogCopy[lang];

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <Reveal
          as="li"
          key={product.id}
          delay={(i % 3) * 90}
          className="group flex flex-col border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
        >
          <div className="overflow-hidden bg-secondary">
            {product.displayImage ? (
              <img
                src={product.displayImage}
                alt={localName(product, lang)}
                loading="lazy"
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            ) : (
              <div className="aspect-4/3 w-full" />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl text-navy">{localName(product, lang)}</h3>
            {product.season && (
              <p className="mt-2 text-[0.7rem] font-bold tracking-[0.14em] text-navy/55 uppercase">
                {c.season}: {product.season}
              </p>
            )}
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
              {localDesc(product, lang)}
            </p>
            <a
              href={ctaHref}
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-navy uppercase transition-colors hover:text-gold"
            >
              {c.inquire}
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
      ))}
    </ul>
  );
}
