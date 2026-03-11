import { PropsWithChildren } from "react";

import { Geist } from "next/font/google";

import type { Metadata } from "next";

import "./global.css";

import Layout from "@/app/layout-modules";
import Provider from "@/components/provider";
import { SessionProvider } from "@/components/provider/session-provider";
import getSession from "@/utils/supabase/getSession";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excolog",
  description: "Excolog",
};

const theme = "light";

async function RootLayout({ children }: PropsWithChildren) {
  // Get session data server-side
  const sessionData = await getSession();
  const session = sessionData?.token ? { token: sessionData.token } : null;

  // Default language (server-side)
  const defaultLang = "tr";

  return (
    <html lang={defaultLang} suppressHydrationWarning>
      <body className={`${geist.className}`} data-theme={`${theme}-ex`}>
        <SessionProvider session={session}>
          <Provider>
            <Layout>{children}</Layout>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
export default RootLayout;
