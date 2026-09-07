import { useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { company } from "@/content/site";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { brandButton } from "@/components/BrandButton";

type FieldKey =
  "name" | "companyName" | "email" | "country" | "phone" | "product" | "quantity" | "message";

const empty: Record<FieldKey, string> = {
  name: "",
  companyName: "",
  email: "",
  country: "",
  phone: "",
  product: "",
  quantity: "",
  message: "",
};

export function InquiryForm() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const schema = z.object({
    name: z.string().trim().min(2, f.errors.name).max(100),
    companyName: z.string().trim().min(2, f.errors.company).max(120),
    email: z.string().trim().email(f.errors.email).max(255),
    country: z.string().trim().min(2, f.errors.country).max(80),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    product: z.string().trim().max(120).optional().or(z.literal("")),
    quantity: z.string().trim().max(80).optional().or(z.literal("")),
    message: z.string().trim().min(10, f.errors.message).max(1500),
  });

  const set = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }
    setErrors({});

    // No email/backend service is connected yet. When `company.formEndpoint`
    // is set, the validated payload is posted there.
    if (!company.formEndpoint) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(company.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  };

  const fields: { key: FieldKey; label: string; type?: string; required?: boolean }[] = [
    { key: "name", label: f.name, required: true },
    { key: "companyName", label: f.companyName, required: true },
    { key: "email", label: f.email, type: "email", required: true },
    { key: "country", label: f.country, required: true },
    { key: "phone", label: f.phone, type: "tel" },
    { key: "product", label: f.product },
    { key: "quantity", label: f.quantity },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.key === "quantity" ? "sm:col-span-1" : undefined}>
            <label
              htmlFor={field.key}
              className="block text-[0.7rem] font-bold tracking-[0.14em] text-navy/70 uppercase"
            >
              {field.label}
              {!field.required && (
                <span className="ms-2 font-medium tracking-normal text-muted-foreground normal-case">
                  ({f.optional})
                </span>
              )}
            </label>
            <input
              id={field.key}
              name={field.key}
              type={field.type ?? "text"}
              value={values[field.key]}
              onChange={set(field.key)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
              className={cn(
                "mt-2 h-11 w-full rounded-sm border bg-background px-3 text-sm text-foreground transition-colors outline-none focus:border-gold",
                errors[field.key] ? "border-destructive" : "border-input",
              )}
            />
            {errors[field.key] && (
              <p id={`${field.key}-error`} className="mt-1.5 text-xs text-destructive">
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-[0.7rem] font-bold tracking-[0.14em] text-navy/70 uppercase"
          >
            {f.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "mt-2 w-full rounded-sm border bg-background p-3 text-sm text-foreground transition-colors outline-none focus:border-gold",
              errors.message ? "border-destructive" : "border-input",
            )}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(brandButton({ variant: "gold", size: "lg" }), "mt-7 w-full sm:w-auto")}
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {f.submit}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{f.notice}</p>

      <div aria-live="polite" className="mt-4">
        {status === "sent" && (
          <p className="flex items-start gap-2 border border-leaf/40 bg-leaf/8 p-3 text-sm text-navy">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
            {f.success}
          </p>
        )}
        {status === "error" && Object.keys(errors).length > 0 && (
          <p className="flex items-start gap-2 border border-destructive/40 bg-destructive/8 p-3 text-sm text-navy">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            {Object.values(errors)[0]}
          </p>
        )}
      </div>
    </form>
  );
}
