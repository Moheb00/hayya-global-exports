import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "@/lib/language";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { brandButton } from "@/components/BrandButton";
import { catalogCopy } from "@/content/site";
import { fetchPublishedProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const title = "Product Catalog | HAYYA Egyptian Agricultural Exports";
const description =
  "Browse HAYYA's current Egyptian fruit and vegetable export lines, with product details for international B2B buyers.";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: () => (
    <LanguageProvider>
      <CatalogPage />
    </LanguageProvider>
  ),
});

function CatalogPage() {
  const { lang } = useLanguage();
  const c = catalogCopy[lang];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "published"],
    queryFn: fetchPublishedProducts,
  });

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32">
        <section className="container-hayya py-14 md:py-20">
          <p className="eyebrow">{c.pageLabel}</p>
          <h1 className="mt-5 max-w-3xl text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[3rem]">
            {c.pageTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {c.pageSub}
          </p>

          <div className="mt-12">
            {isLoading && <p className="text-sm text-muted-foreground">{c.loading}</p>}
            {isError && <p className="text-sm text-destructive">{c.error}</p>}
            {!isLoading && !isError && (data ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">{c.empty}</p>
            )}
            {(data ?? []).length > 0 && <ProductGrid products={data ?? []} />}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <a href="/#contact" className={cn(brandButton({ variant: "gold", size: "lg" }))}>
              {c.inquire}
            </a>
            <Link to="/" className={cn(brandButton({ variant: "outline", size: "lg" }))}>
              {c.backHome}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
