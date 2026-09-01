import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/hayya-logo.png";
import { useLanguage } from "@/lib/language";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandLink } from "@/components/BrandButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#products", key: "products" },
  { href: "#why", key: "why" },
  { href: "#partnerships", key: "partnerships" },
  { href: "#contact", key: "contact" },
] as const;

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/92 shadow-soft backdrop-blur-md"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "container-hayya flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20 md:h-24",
        )}
      >
        <a href="#home" className="flex items-center" aria-label="HAYYA home">
          <img
            src={logo}
            alt="HAYYA"
            width={1152}
            height={576}
            className={cn("w-auto transition-all duration-300", scrolled ? "h-8" : "h-10 md:h-11")}
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="relative text-sm font-medium text-navy/75 transition-colors hover:text-navy after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <BrandLink href="#contact" variant="gold">
            {t.nav.quote}
          </BrandLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.menu}
            className="grid h-11 w-11 place-items-center rounded-sm border border-navy/20 text-navy"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-navy-deep transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="container-hayya flex h-20 items-center justify-between">
          <span className="font-display text-lg font-semibold text-on-navy">HAYYA</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.nav.close}
            className="grid h-11 w-11 place-items-center rounded-sm border border-on-navy/25 text-on-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="container-hayya mt-6 flex flex-col" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-on-navy/12 py-4 text-xl font-medium text-on-navy"
            >
              {t.nav[l.key]}
            </a>
          ))}
          <BrandLink
            href="#contact"
            variant="gold"
            size="lg"
            className="mt-8 w-full"
            onClick={() => setOpen(false)}
          >
            {t.nav.quote}
          </BrandLink>
          <div className="mt-6">
            <LanguageSwitcher tone="light" />
          </div>
        </nav>
      </div>
    </header>
  );
}
