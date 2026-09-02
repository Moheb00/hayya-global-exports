import { Mail, Phone, MapPin } from "lucide-react";
import { company } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { Reveal } from "@/components/Reveal";
import { InquiryForm } from "@/components/InquiryForm";

export function Contact() {
  const { t, lang } = useLanguage();

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-32">
      <div className="container-hayya grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{t.contact.label}</p>
          <h2 className="mt-5 text-3xl leading-[1.14] text-navy sm:text-4xl lg:text-[2.9rem]">
            {t.contact.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.contact.sub}</p>

          <dl className="mt-10 space-y-7">
            <div className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} />
              <div>
                <dt className="text-[0.7rem] font-bold tracking-[0.16em] text-navy/60 uppercase">
                  {t.contact.emailLabel}
                </dt>
                <dd className="mt-1 font-medium break-all text-navy">
                  {company.emailIsValid ? (
                    <a href={`mailto:${company.email}`} className="hover:text-gold">
                      {company.email}
                    </a>
                  ) : (
                    <span>{company.email}</span>
                  )}
                </dd>
                {!company.emailIsValid && (
                  <dd className="mt-1 text-xs text-muted-foreground">{t.contact.emailNote}</dd>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} />
              <div>
                <dt className="text-[0.7rem] font-bold tracking-[0.16em] text-navy/60 uppercase">
                  {t.contact.phoneLabel}
                </dt>
                <dd className="mt-1 font-medium text-navy">
                  <a href={`tel:${company.phoneHref}`} dir="ltr" className="hover:text-gold">
                    {company.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} />
              <div>
                <dt className="text-[0.7rem] font-bold tracking-[0.16em] text-navy/60 uppercase">
                  {t.contact.locationLabel}
                </dt>
                <dd className="mt-1 font-medium text-navy">{company.location[lang]}</dd>
              </div>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
