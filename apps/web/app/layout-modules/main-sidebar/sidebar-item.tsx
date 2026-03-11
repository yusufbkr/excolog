import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@excolog/ui/components/collapsible";
import { Highlighter } from "@excolog/ui/components/highlighter";
import Icon from "@excolog/ui/components/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@excolog/ui/components/sidebar";

import type { SidebarLinkProps } from "@/app/layout-modules/main-sidebar/use-sidebar-items";

interface SidebarItemProps {
  link: SidebarLinkProps;
  collapsed: boolean;
  onClick: () => void;
  searchQuery: string;
}

function SidebarItem({
  link,
  collapsed,
  onClick,
  searchQuery,
}: SidebarItemProps) {
  return (
    <Collapsible asChild open={collapsed}>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={link.title}
          className="cursor-pointer"
          size="md"
          isActive={link.isActive}
          asChild
          onClick={onClick}
        >
          <CollapsibleTrigger asChild>
            <Link
              href={link.route || "#"}
              className="flex cursor-pointer justify-between"
              onClick={(e) => !link.route && e.preventDefault()}
            >
              <div className="flex items-center gap-2">
                {link.icon && <Icon name={link.icon} />}
                <span>
                  <Highlighter text={link.title} searchQuery={searchQuery} />
                </span>
              </div>
              {link.itemType === "sub-container" && (
                <Icon
                  name="chevron-right"
                  className="transition-transform duration-200 group-data-[state=open]/menu-item:rotate-90"
                />
              )}
            </Link>
          </CollapsibleTrigger>
        </SidebarMenuButton>
        {link.itemType === "sub-container" && (
          <CollapsibleContent>
            <SidebarMenuSub className="py-1">
              {link.subLinks.map((sublink) => (
                <SidebarMenuSubItem key={sublink.title}>
                  <SidebarMenuSubButton
                    asChild
                    className="cursor-pointer"
                    isActive={sublink.isActive}
                  >
                    <Link href={sublink.route}>
                      <div className="flex items-center gap-2 truncate">
                        {sublink.icon && <Icon name={sublink.icon} />}
                        <span className="truncate">
                          <Highlighter
                            text={sublink.title}
                            searchQuery={searchQuery}
                          />
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default SidebarItem;
