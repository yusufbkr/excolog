"use client";

import { ComponentProps, useEffect, useState, RefObject } from "react";

import Icon, { IconListProps } from "@excolog/ui/components/icon";
import cn from "@excolog/ui/utils/cn";

export type ScrollIndicatorPosition = "left" | "right" | "top" | "bottom";

interface ScrollIndicatorProps extends Omit<ComponentProps<"div">, "ref"> {
  ref: RefObject<HTMLElement | null>;
  position?: ScrollIndicatorPosition;
  variant?: "arrow" | "fade";
  size?: "sm" | "md" | "lg";
}

function ScrollIndicator({
  ref,
  position = "right",
  className,
  ...props
}: ScrollIndicatorProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateScrollState = () => {
      const {
        scrollLeft,
        scrollTop,
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = element;
      const offset = 10;

      const canScroll =
        (position === "left" && scrollLeft > offset) ||
        (position === "right" &&
          scrollLeft < scrollWidth - clientWidth - offset) ||
        (position === "top" && scrollTop > offset) ||
        (position === "bottom" &&
          scrollTop < scrollHeight - clientHeight - offset);

      setShouldShow(canScroll);
    };

    const handleScroll = () => {
      updateScrollState();
    };

    handleScroll();

    const resizeObserver = new ResizeObserver(updateScrollState);

    element.addEventListener("scroll", handleScroll, { passive: true });
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [ref, position]);

  const animationClasses: Record<ScrollIndicatorPosition, string> = {
    left: "animate-bounce-x-left",
    right: "animate-bounce-x-right",
    top: "animate-bounce-y-up",
    bottom: "animate-bounce-y-down",
  };

  const icons: Partial<Record<ScrollIndicatorPosition, IconListProps>> = {
    left: "chevron-left",
    right: "chevron-right",
    top: "chevron-up",
    bottom: "chevron-down",
  };

  const iconName = icons[position] ?? "chevron-right";

  return (
    <div
      {...props}
      className={cn(
        className,
        "pointer-events-none absolute z-20 bg-transparent",
        "flex size-6 items-center justify-center opacity-0 transition-opacity",
        "before:bg-background before:blur-xs before:absolute before:inset-0 before:rounded-full before:content-['']",
        animationClasses[position],
        shouldShow && "opacity-100",
      )}
    >
      <Icon name={iconName} className="text-muted-foreground relative z-10" />
    </div>
  );
}

export default ScrollIndicator;
