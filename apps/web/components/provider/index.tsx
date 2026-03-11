import { CSSProperties, PropsWithChildren } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { SidebarProvider } from "@excolog/ui/components/sidebar";
import { Toaster } from "@excolog/ui/components/sonner";

import QueryProvider from "@/components/provider/query-provider";
import ThemeProvider from "@/components/provider/theme-provider";

function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        <QueryProvider>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as CSSProperties
            }
          >
            <Toaster />
            {children}
          </SidebarProvider>
        </QueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}

export default Provider;
