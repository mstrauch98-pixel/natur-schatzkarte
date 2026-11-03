// =========================================================
// Verbindung zu Supabase
// Der "publishable" Schlüssel darf öffentlich sein.
// Geschützt werden die Daten durch die Regeln (RLS) in Supabase.
// NIEMALS hier einen "secret"- oder "service_role"-Schlüssel eintragen!
// =========================================================

const SUPABASE_URL = "https://qrolgtuydxgjodbeuele.supabase.co";
const SUPABASE_KEY = "sb_publishable_9L85Qq0P3JWVRsMmRQYH_A_Gs6f6obI";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});
