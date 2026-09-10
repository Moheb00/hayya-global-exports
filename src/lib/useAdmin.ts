import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { claimCatalogOwner } from "@/lib/admin.functions";

/**
 * Tracks the signed-in session and whether that account owns the catalog.
 * The first account that ever signs in claims ownership.
 */
export function useAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const resolve = async (next: Session | null) => {
      if (!active) return;
      setSession(next);
      if (!next) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const result = await claimCatalogOwner();
        if (!active) return;
        setIsAdmin(result.isAdmin === true);
      } catch {
        if (!active) return;
        setIsAdmin(false);
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      void resolve(next);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading };
}
