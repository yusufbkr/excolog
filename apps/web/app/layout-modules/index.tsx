import { PropsWithChildren } from "react";

import { SidebarInset } from "@excolog/ui/components/sidebar";

import AppSidebar from "./app-sidebar";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset className="h-[calc(100vh-1rem)] overflow-y-auto">
        {children}
      </SidebarInset>
    </>
  );
}

export default Layout;
