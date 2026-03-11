"use client";

import { ComponentProps } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import Icon from "@excolog/ui/components/icon";
import cn from "@excolog/ui/utils/cn";

function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "border-input dark:bg-input/30 aria-checked:bg-primary aria-checked:text-primary-foreground dark:aria-checked:bg-primary aria-checked:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive peer size-4 shrink-0 cursor-pointer rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <Icon name="check" className="size-3.5" />
      </CheckboxPrimitive.Indicator>
      {props.disabled && <Icon name="x" className="size-3.5" />}
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
