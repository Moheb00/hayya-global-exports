import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const { lang, setLang } = useLanguage();

  const base =
    "px-2.5 py-1 text-xs font-bold tracking-[0.14em] rounded-[3px] transition-colors duration-200";

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-sm border p-0.5",
        tone === "dark" ? "border-navy/20" : "border-on-navy/25",
        className,
      )}
    >
      {(["en", "ar"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            lang={code}
            className={cn(
              base,
              active
                ? "bg-navy text-on-navy"
                : tone === "dark"
                  ? "text-navy/60 hover:text-navy"
                  : "text-on-navy/65 hover:text-on-navy",
              active && tone === "light" && "bg-gold text-navy-deep",
            )}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
