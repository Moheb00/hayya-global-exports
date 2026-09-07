import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { catalogCopy } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";
import { ProductGrid } from "@/components/ProductGrid";
import { brandButton } from "@/components/BrandButton";
import { fetchPublishedProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function Products() {
  const { t, lang } = useLanguage();
  const c = catalogCopy[lang];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "published"],
    queryFn: fetchPublishedProducts,
  });

  const all = data ?? [];
  const featured = all.filter((p) => p.is_featured);
  const highlights = (featured.length > 0 ? featured : all).slice(0, 3);

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

        <div className="mt-14">
          {isLoading && <p className="text-sm text-muted-foreground">{c.loading}</p>}
          {isError && <p className="text-sm text-destructive">{c.error}</p>}
          {!isLoading && !isError && highlights.length === 0 && (
            <p className="text-sm text-muted-foreground">{c.empty}</p>
          )}
          {highlights.length > 0 && <ProductGrid products={highlights} />}
        </div>

        <div className="mt-12">
          <Link to="/products" className={cn(brandButton({ variant: "solid", size: "lg" }))}>
            {c.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
