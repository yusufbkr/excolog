import { useState } from "react";

import { isHighlighted } from "@excolog/ui/components/highlighter";
import { Input } from "@excolog/ui/components/input";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@excolog/ui/components/sidebar";
import { Skeleton } from "@excolog/ui/components/skeleton";

import SidebarItem from "./sidebar-item";
import useSidebarItems from "./use-sidebar-items";

function MainSidebar() {
  const isUserPermissionsLoading = false;
  const [activeItem, setActiveItem] = useState<string | null | undefined>(
    undefined,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const items = useSidebarItems();

  const activeSidebarItem = items.find((item) => item.isActive);
  const effectiveActiveItem =
    activeItem ??
    (activeSidebarItem
      ? `${activeSidebarItem.title}-${activeSidebarItem.itemType}-${activeSidebarItem.route}`
      : null);

  return (
    <SidebarGroup className="py-0">
      <div className="bg-background sticky top-0 z-10 mb-2 rounded-md">
        <Input
          inputProps={{
            className: "focus-visible:ring-0 rounded-md",
            placeholder: "Menüde ara...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
          }}
          leftIconProps={{
            name: "search",
            className: "text-muted-foreground",
          }}
        />
      </div>

      <SidebarMenu>
        {isUserPermissionsLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <SidebarMenuItem key={index}>
                <Skeleton className="h-10 w-full" />
              </SidebarMenuItem>
            ))
          : items.map((link) => {
              const itemKey = `${link.title}-${link.itemType}-${link.route}`;
              const isItemHighlighted =
                !!link.title &&
                !!searchQuery &&
                (isHighlighted(link.title, searchQuery) ||
                  (link.itemType === "sub-container" &&
                    link.subLinks.some((sublink) =>
                      isHighlighted(sublink.title, searchQuery),
                    )));

              return (
                <SidebarItem
                  key={itemKey}
                  link={link}
                  collapsed={
                    effectiveActiveItem === itemKey || isItemHighlighted
                  }
                  onClick={() =>
                    link.itemType === "sub-container" &&
                    link.subLinks.length &&
                    setActiveItem((prev) =>
                      (prev ?? effectiveActiveItem) === itemKey
                        ? null
                        : itemKey,
                    )
                  }
                  searchQuery={searchQuery}
                />
              );
            })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
export default MainSidebar;
