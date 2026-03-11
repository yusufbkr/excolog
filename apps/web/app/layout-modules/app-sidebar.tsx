"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProps,
} from "@repo/ui/components/sidebar";

import MainSidebar from "./main-sidebar";
import NavFooter from "./nav-footer";

function AppSidebar(props: SidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-[177px] data-[slot=sidebar-menu-button]:!p-0"
            >
              <Link href="/" title="Excolog">
                <Image
                  src="/v2/panel/logo.png"
                  alt="logo"
                  width={256}
                  height={177}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainSidebar />
      </SidebarContent>
      <NavFooter />
    </Sidebar>
  );
}

export default AppSidebar;
