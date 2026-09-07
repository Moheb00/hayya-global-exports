import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { LanguageProvider, useLanguage } from "@/lib/language";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { brandButton } from "@/components/BrandButton";
import { catalogCopy } from "@/content/site";
import { useAdmin } from "@/lib/useAdmin";
import {
  createProduct,
  deleteProduct,
  emptyProduct,
  fetchAllProducts,
  localName,
  updateProduct,
  uploadProductImage,
  type ProductInput,
  type ProductWithImage,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Manage Catalog | HAYYA" },
      { name: "description", content: "Add, edit and remove HAYYA product catalog entries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Catalog | HAYYA" },
      { property: "og:description", content: "Private catalog management for HAYYA." },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <AdminPage />
    </LanguageProvider>
  ),
});

const input =
  "mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-gold";
const label = "block text-[0.7rem] font-bold tracking-[0.14em] text-navy/70 uppercase";

function AdminPage() {
  const { lang } = useLanguage();
  const a = catalogCopy[lang].admin;
  const { session, isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-background">
        <div className="container-hayya flex h-20 items-center justify-between">
          <Link to="/" className="font-display text-lg font-semibold text-navy">
            HAYYA
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {session && (
              <button
                type="button"
                onClick={() => void supabase.auth.signOut()}
                className={cn(brandButton({ variant: "outline" }))}
              >
                {a.signOut}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container-hayya py-12">
        {!session ? (
          <SignInCard />
        ) : !isAdmin ? (
          <p className="max-w-lg border border-destructive/40 bg-destructive/8 p-4 text-sm text-navy">
            {a.noAccess}
          </p>
        ) : (
          <CatalogManager />
        )}
      </main>
    </div>
  );
}

function SignInCard() {
  const { lang } = useLanguage();
  const a = catalogCopy[lang].admin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const run = async (mode: "in" | "up") => {
    setBusy(true);
    setMessage(null);
    const result =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else if (mode === "up" && !result.data.session)
      setMessage("Check your inbox to confirm your email, then sign in.");
  };

  const google = async () => {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) setMessage(result.error.message ?? "Sign-in failed.");
  };

  return (
    <div className="max-w-md border border-border bg-card p-7">
      <h1 className="text-2xl text-navy">{a.signInTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{a.signInSub}</p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void run("in");
        }}
      >
        <div>
          <label className={label} htmlFor="admin-email">
            {a.email}
          </label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className={label} htmlFor="admin-password">
            {a.password}
          </label>
          <input
            id="admin-password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
          />
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <button type="submit" disabled={busy} className={cn(brandButton({ variant: "solid" }))}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {a.signIn}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void run("up")}
            className={cn(brandButton({ variant: "outline" }))}
          >
            {a.signUp}
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={() => void google()}
        className={cn(brandButton({ variant: "outline" }), "mt-4 w-full")}
      >
        {a.google}
      </button>

      {message && <p className="mt-4 text-sm text-navy">{message}</p>}
    </div>
  );
}

function CatalogManager() {
  const { lang } = useLanguage();
  const a = catalogCopy[lang].admin;
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["products", "all"], queryFn: fetchAllProducts });
  const [editing, setEditing] = useState<ProductWithImage | "new" | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const remove = async (product: ProductWithImage) => {
    if (!window.confirm(a.confirmRemove)) return;
    try {
      await deleteProduct(product);
      setStatus(null);
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-navy">{a.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{a.sub}</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className={cn(brandButton({ variant: "gold" }))}
        >
          <Plus className="h-4 w-4" />
          {a.newProduct}
        </button>
      </div>

      {status && <p className="mt-4 text-sm text-destructive">{status}</p>}

      {editing && (
        <ProductForm
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await refresh();
          }}
        />
      )}

      <div className="mt-10 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">{catalogCopy[lang].loading}</p>}
        {(data ?? []).map((product) => (
          <div
            key={product.id}
            className="flex flex-wrap items-center gap-4 border border-border bg-card p-4"
          >
            {product.displayImage ? (
              <img
                src={product.displayImage}
                alt=""
                className="h-16 w-20 shrink-0 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-16 w-20 shrink-0 bg-secondary" />
            )}
            <div className="min-w-40 flex-1">
              <p className="font-medium text-navy">{localName(product, lang)}</p>
              <p className="text-xs text-muted-foreground">
                #{product.sort_order}
                {product.is_featured ? " · ★" : ""}
                {product.is_published ? "" : " · —"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(product)}
                className={cn(brandButton({ variant: "outline" }))}
              >
                <Pencil className="h-4 w-4" />
                {a.edit}
              </button>
              <button
                type="button"
                onClick={() => void remove(product)}
                className={cn(
                  brandButton({ variant: "outline" }),
                  "border-destructive/40 text-destructive hover:border-destructive hover:bg-destructive/5",
                )}
              >
                <Trash2 className="h-4 w-4" />
                {a.remove}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({
  product,
  onClose,
  onSaved,
}: {
  product: ProductWithImage | null;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const { lang } = useLanguage();
  const a = catalogCopy[lang].admin;
  const [values, setValues] = useState<ProductInput>(emptyProduct());
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      const { id: _id, displayImage, ...rest } = product;
      setValues(rest);
      setPreview(displayImage);
    } else {
      setValues(emptyProduct());
      setPreview(null);
    }
  }, [product]);

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const path = await uploadProductImage(file);
      set("image_path", path);
      set("image_url", "");
      setPreview(URL.createObjectURL(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name_en.trim()) return setError(a.nameRequired);
    if (!values.image_path && !values.image_url) return setError(a.photoRequired);
    setSaving(true);
    setError(null);
    try {
      if (product) await updateProduct(product.id, values);
      else await createProduct(values);
      await onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 border border-border bg-card p-6 md:p-8">
      <h2 className="text-xl text-navy">{product ? a.editProduct : a.newProduct}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name_en">
            {a.nameEn}
          </label>
          <input
            id="name_en"
            className={input}
            value={values.name_en}
            onChange={(e) => set("name_en", e.target.value)}
            maxLength={120}
          />
        </div>
        <div>
          <label className={label} htmlFor="name_ar">
            {a.nameAr}
          </label>
          <input
            id="name_ar"
            className={input}
            dir="rtl"
            value={values.name_ar}
            onChange={(e) => set("name_ar", e.target.value)}
            maxLength={120}
          />
        </div>
        <div>
          <label className={label} htmlFor="description_en">
            {a.descEn}
          </label>
          <textarea
            id="description_en"
            rows={3}
            className={cn(input, "h-auto py-2")}
            value={values.description_en}
            onChange={(e) => set("description_en", e.target.value)}
            maxLength={600}
          />
        </div>
        <div>
          <label className={label} htmlFor="description_ar">
            {a.descAr}
          </label>
          <textarea
            id="description_ar"
            rows={3}
            dir="rtl"
            className={cn(input, "h-auto py-2")}
            value={values.description_ar}
            onChange={(e) => set("description_ar", e.target.value)}
            maxLength={600}
          />
        </div>
        <div>
          <label className={label} htmlFor="season">
            {a.seasonField}
          </label>
          <input
            id="season"
            className={input}
            value={values.season}
            onChange={(e) => set("season", e.target.value)}
            maxLength={80}
          />
        </div>
        <div>
          <label className={label} htmlFor="sort_order">
            {a.order}
          </label>
          <input
            id="sort_order"
            type="number"
            className={input}
            value={values.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="mt-6">
        <span className={label}>{a.photo}</span>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          {preview && <img src={preview} alt="" className="h-20 w-28 object-cover" />}
          <label
            className={cn(brandButton({ variant: "outline" }), "cursor-pointer")}
            htmlFor="photo-input"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? a.uploading : a.uploadPhoto}
          </label>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            checked={values.is_published}
            onChange={(e) => set("is_published", e.target.checked)}
          />
          {a.published}
        </label>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            checked={values.is_featured}
            onChange={(e) => set("is_featured", e.target.checked)}
          />
          {a.featured}
        </label>
      </div>

      {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className={cn(brandButton({ variant: "gold" }))}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? a.saving : a.save}
        </button>
        <button type="button" onClick={onClose} className={cn(brandButton({ variant: "outline" }))}>
          {a.cancel}
        </button>
      </div>
    </form>
  );
}
