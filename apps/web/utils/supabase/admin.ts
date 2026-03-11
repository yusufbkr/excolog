import { createClient } from "@supabase/supabase-js";

const { NEXT_PUBLIC_SUPABASE_URL, SERVICE_ROLE } = process.env;

export const supabase = createClient(
	NEXT_PUBLIC_SUPABASE_URL ?? "",
	SERVICE_ROLE ?? "",
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	},
);
