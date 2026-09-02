import logo from "@/assets/hayya-logo.png";
import { company, products } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navKeys = ["home", "about", "products", "why", "partnerships", "contact"] as const;
const navHrefs: Record<(typeof navKeys)[number], string> = {
  home: "#home",
  about: "#about",
  products: "#products",
  why: "#why",
  partnerships: "#partnerships",
  contact: "#contact",
};

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-navy-deep pt-16 pb-8 text-on-navy">
      <div className="container-hayya grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img
            src={logo}
            alt="HAYYA"
            width={1152}
            height={576}
            loading="lazy"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-navy-muted">
            {t.footer.desc}
          </p>
          <div className="mt-6">
            <p className="text-[0.7rem] font-bold tracking-[0.16em] text-on-navy/50 uppercase">
              {t.footer.language}
            </p>
            <LanguageSwitcher tone="light" className="mt-2.5" />
          </div>
        </div>

        <nav aria-label={t.footer.nav}>
          <h2 className="font-sans text-[0.7rem] font-bold tracking-[0.16em] text-on-navy/50 uppercase">
            {t.footer.nav}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navKeys.map((key) => (
              <li key={key}>
                <a
                  href={navHrefs[key]}
                  className="text-sm text-on-navy-muted transition-colors hover:text-gold"
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-[0.7rem] font-bold tracking-[0.16em] text-on-navy/50 uppercase">
            {t.footer.products}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {products.map((product) => (
              <li key={product.id}>
                <a
                  href="#products"
                  className="text-sm text-on-navy-muted transition-colors hover:text-gold"
                >
                  {product[lang].name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-[0.7rem] font-bold tracking-[0.16em] text-on-navy/50 uppercase">
            {t.footer.contact}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-on-navy-muted">
            <li>
              <a href={`tel:${company.phoneHref}`} dir="ltr" className="hover:text-gold">
                {company.phone}
              </a>
            </li>
            <li className="break-all">{company.email}</li>
            <li>{company.location[lang]}</li>
          </ul>
        </div>
      </div>

      <div className="container-hayya mt-14 border-t border-on-navy/15 pt-6">
        <p className="text-xs text-on-navy/55">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
