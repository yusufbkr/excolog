import { ComponentProps, ComponentPropsWithoutRef, Ref } from "react";

import Icon from "@excolog/ui/components/icon";
import cn from "@excolog/ui/utils/cn";

interface Props {
  wrapperProps?: ComponentProps<"div">;
  inputProps?: ComponentProps<"input">;
  ref?: Ref<HTMLInputElement>;
  isLoading?: boolean;
  leftIconProps?: ComponentPropsWithoutRef<typeof Icon>;
}

function Input({
  wrapperProps,
  inputProps,
  ref,
  isLoading,
  leftIconProps,
}: Props) {
  return (
    <div
      {...wrapperProps}
      className={cn(
        "group relative w-full",
        (inputProps?.disabled || isLoading) && "pointer-events-none opacity-50",
        wrapperProps?.className,
      )}
    >
      {leftIconProps && (
        <Icon
          {...leftIconProps}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2",
            leftIconProps.className,
          )}
        />
      )}
      <input
        ref={ref}
        autoComplete="off"
        aria-autocomplete="list"
        data-slot="input"
        name="default-input-field"
        {...inputProps}
        {...(inputProps?.type === "number" && {
          min: inputProps?.min ?? 0,
        })}
        onKeyDown={(e) => {
          if (e.currentTarget.value.length < 1 && e.code === "Space") {
            e.preventDefault();
          }

          if (inputProps?.onKeyDown) {
            inputProps?.onKeyDown(e);
          }
          if (inputProps?.type === "number") {
            /**
             * Safari ve Firefox input tipi number olsa bile yazı yazılmasına izin veriyor.
             * Bu nedenle sadece `Sayılar | Backspace | Tab | Delete | Arrow Yön Tuşları`na
             * izin veriyoruz.
             **/
            const regex = new RegExp(
              /(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|\.|,)/,
            );
            return !e.key.match(regex) && e.preventDefault();
          }
        }}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          leftIconProps && "pl-8",
          inputProps?.className,
        )}
      />
    </div>
  );
}

export { Input };
