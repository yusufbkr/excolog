import { ComponentProps } from "react";

import Icon from "@excolog/ui/components/icon";
import cn from "@excolog/ui/utils/cn";

interface Props extends ComponentProps<"div"> {
  iconClassName?: string;
}

function Loading({ className, iconClassName, ...props }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center rounded-md",
        "from-background/10 via-background to-background/10 bg-gradient-to-r",
        className,
      )}
      {...props}
    >
      <Icon
        name="loader"
        className={cn("size-6 animate-spin", iconClassName)}
      />
    </div>
  );
}

export { Loading };
