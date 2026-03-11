import Icon from "@excolog/ui/components/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@excolog/ui/components/tooltip";
import cn from "@excolog/ui/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <div className="group relative w-full">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...props}
      />
      {props.maxLength && (
        <span className="text-muted-foreground absolute bottom-2 right-2 flex items-center gap-2 text-xs">
          {(props.value as string)?.length || 0} / {props.maxLength} karakter
          {props.minLength && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon name="circle-alert" />
              </TooltipTrigger>
              <TooltipContent>
                Minimum {props.minLength} karakter gereklidir.
              </TooltipContent>
            </Tooltip>
          )}
        </span>
      )}
    </div>
  );
}

export { Textarea };
