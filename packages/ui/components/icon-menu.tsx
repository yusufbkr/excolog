"use client";

import { useState } from "react";

import { Button } from "@excolog/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@excolog/ui/components/dropdown-menu";
import Icon, { type IconListProps } from "@excolog/ui/components/icon";
import cn from "@excolog/ui/utils/cn";

import { iconList } from "./icon/icon-list";

interface IconMenuProps {
  value?: IconListProps;
  onChange: (iconName: IconListProps) => void;
  placeholder?: string;
  hideTitle?: boolean;
  className?: string;
}

function IconMenu({
  value,
  onChange,
  placeholder,
  hideTitle = false,
  className,
}: IconMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedIcon = iconList.find((icon) => icon.label === value);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            className,
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              hideTitle && "w-full justify-center",
            )}
          >
            {selectedIcon ? (
              <Icon name={selectedIcon.label} className="h-4 w-4" />
            ) : (
              <div className="border-muted-foreground h-4 w-4 rounded border-2 border-dashed" />
            )}
            {!hideTitle && (
              <span className="text-sm">
                {selectedIcon
                  ? selectedIcon.label
                  : placeholder || "Icon seçin"}
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-80 w-80 overflow-y-auto">
        <div className="grid grid-cols-4 p-2">
          {iconList.map((icon) => (
            <Button
              key={icon.label}
              variant="ghost"
              onClick={() => {
                onChange(icon.label);
                setIsOpen(false);
              }}
              className="hover:bg-accent flex h-auto flex-col items-center justify-center gap-2 p-2"
            >
              <Icon name={icon.label} />
              <span className="text-center text-xs">{icon.label}</span>
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default IconMenu;
