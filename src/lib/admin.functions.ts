import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Confirms whether the signed-in account owns the catalog.
 * If no owner exists yet, the first signed-in account claims ownership.
 * Runs server-side only, so the client can never grant itself the role.
 */
export const claimCatalogOwner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    const { data: admins, error: listError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");
    if (listError) throw new Error("Could not verify catalog access.");

    if ((admins ?? []).length > 0) {
      return { isAdmin: (admins ?? []).some((row) => row.user_id === userId) };
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (insertError) throw new Error("Could not set up catalog access.");

    return { isAdmin: true };
  });
