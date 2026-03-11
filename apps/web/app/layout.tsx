import { PropsWithChildren } from "react";

import { Geist } from "next/font/google";

import type { Metadata } from "next";

import Layout from "@/app/layout-modules";
import Provider from "@/components/provider";

import "./global.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excolog",
  description: "Excolog",
};

const theme = "light";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geist.className}`} data-theme={`${theme}-ex`}>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
