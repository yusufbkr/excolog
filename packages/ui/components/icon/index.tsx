import { ComponentType } from "react";

import { IconBaseProps } from "react-icons";

import cn from "@repo/ui/utils/cn";

import { iconList } from "./icon-list";

export type IconListProps = (typeof iconList)[number]["label"];

export interface IconProps extends Omit<IconBaseProps, "color" | "size"> {
  name: IconListProps;
}

function Icon({ name, className, ...props }: IconProps) {
  const selectedIcon = iconList.find((icon) => icon.label === name);

  if (!selectedIcon) return null;
  const IconComponent = selectedIcon.icon as ComponentType<IconBaseProps>;

  return (
    <IconComponent name={name} {...props} className={cn("size-4", className)} />
  );
}

export default Icon;
