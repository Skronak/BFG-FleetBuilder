import { createClient } from "@supabase/supabase-js";


export const supabase= createClient(
    import.meta.env.VITE_AUTHDOMAIN,
    import.meta.env.VITE_APIKEY,
)