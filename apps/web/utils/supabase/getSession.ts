import { createClient } from "@/utils/supabase/server";

const getSession = async () => {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return { token: null };
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return { token: null };
    }

    const session = data.session;
    if (!session) {
      return { token: null };
    }

    return { token: session.access_token };
  } catch (error) {
    console.error("Error in getSession:", error);
    return { token: null };
  }
};

export default getSession;
