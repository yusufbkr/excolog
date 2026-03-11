"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export type Session = {
  token?: string;
  email?: string | undefined;
} | null;

export const SessionContext = createContext<{
  session: Session;
  setSession: (session: Session) => void;
  customerSession: Session;
  setCustomerSession: (session: Session) => void;
}>({
  session: null,
  setSession: () => {},
  customerSession: null,
  setCustomerSession: () => {},
});

export const SessionProvider = ({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session?: Session;
}) => {
  const [session, setSession] = useState<Session>(initialSession || null);
  const [customerSession, setCustomerSession] = useState<Session>(null);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession({
          token: session.access_token,
          email: session.user.email,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession({
          token: session.access_token,
          email: session.user.email,
        });
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, setSession, customerSession, setCustomerSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

export const useToken = () => {
  const { session } = useSession();
  return session?.token || "";
};
