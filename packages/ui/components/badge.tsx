import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import cn from "@repo/ui/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-green-500 text-white [a&]:hover:bg-green-600 dark:bg-green-600 dark:[a&]:hover:bg-green-700",
        warning:
          "bg-yellow-500 text-black [a&]:hover:bg-yellow-600 dark:bg-yellow-600 dark:text-white dark:[a&]:hover:bg-yellow-700",
        info: "bg-blue-500 text-white [a&]:hover:bg-blue-600 dark:bg-blue-600 dark:[a&]:hover:bg-blue-700",
        muted: "bg-muted text-muted-foreground [a&]:hover:bg-muted/80",
        create:
          "bg-green-500 text-white [a&]:hover:bg-green-600 dark:bg-green-600 dark:[a&]:hover:bg-green-700",
        read: "bg-blue-500 text-white [a&]:hover:bg-blue-600 dark:bg-blue-600 dark:[a&]:hover:bg-blue-700",
        update:
          "bg-yellow-500 text-black [a&]:hover:bg-yellow-600 dark:bg-yellow-600 dark:text-white dark:[a&]:hover:bg-yellow-700",
        delete:
          "bg-red-500 text-white [a&]:hover:bg-red-600 dark:bg-red-600 dark:[a&]:hover:bg-red-700",
        admin:
          "bg-purple-500 text-white [a&]:hover:bg-purple-600 dark:bg-purple-600 dark:[a&]:hover:bg-purple-700",
        draft:
          "bg-gray-500 text-white [a&]:hover:bg-gray-600 dark:bg-gray-500 dark:[a&]:hover:bg-gray-600",
        pending:
          "bg-orange-500 text-white [a&]:hover:bg-orange-600 dark:bg-orange-600 dark:[a&]:hover:bg-orange-700",
        active:
          "bg-green-500 text-white [a&]:hover:bg-green-600 dark:bg-green-600 dark:[a&]:hover:bg-green-700",
        archived:
          "bg-slate-500 text-white [a&]:hover:bg-slate-600 dark:bg-slate-600 dark:[a&]:hover:bg-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
