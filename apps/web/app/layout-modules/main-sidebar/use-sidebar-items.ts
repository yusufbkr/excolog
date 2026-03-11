import { usePathname } from "next/navigation";

import { IconListProps } from "@excolog/ui/components/icon";

interface BaseSidebarItemProps {
  itemType: "default" | "sub-container";
  title: string;
  isActive: boolean;
  route: string;
  icon: IconListProps;
  show?: boolean;
}

interface SidebarDefaultItemProps extends BaseSidebarItemProps {
  itemType: "default";
}

interface SidebarSubLinkContainerItemProps
  extends Omit<BaseSidebarItemProps, "itemType" | "icon"> {
  icon?: IconListProps;
}

interface SidebarContainerItemProps
  extends Omit<BaseSidebarItemProps, "route"> {
  itemType: "sub-container";
  route?: string;
  subLinks: SidebarSubLinkContainerItemProps[];
}

export type SidebarLinkProps =
  | SidebarDefaultItemProps
  | SidebarContainerItemProps;

function useSidebarItems() {
  const pathname = usePathname();

  const sidebarItems: SidebarLinkProps[] = [
    {
      itemType: "sub-container",
      title: "Kullanıcılar",
      icon: "users",
      isActive: pathname.startsWith("/kullanicilar"),
      subLinks: [
        {
          title: "Tüm Kullanıcılar",
          route: "/kullanicilar",
          isActive: pathname === "/kullanicilar",
        },
      ],
    },
  ];

  return sidebarItems
    .map((item) =>
      item.itemType === "sub-container"
        ? {
            ...item,
            subLinks: item.subLinks.filter((subLink) =>
              "show" in subLink ? subLink.show : true,
            ),
          }
        : item,
    )
    .filter((item) => item.show ?? true);
}

export default useSidebarItems;
