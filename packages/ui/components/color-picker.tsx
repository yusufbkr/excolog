"use client";

import { HexColorPicker } from "react-colorful";

import { Button } from "@repo/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import cn from "@repo/ui/utils/cn";

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  placeholder?: string;
  hideTitle?: boolean;
  className?: string;
}

function ColorPicker({
  value = "#000000",
  onChange,
  hideTitle = false,
  className,
}: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
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
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: value }}
            />
            {!hideTitle && <span className="text-sm">{value}</span>}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <HexColorPicker
          color={value}
          onChange={onChange}
          className="h-48 w-48"
        />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
