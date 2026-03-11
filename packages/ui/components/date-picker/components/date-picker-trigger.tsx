import { Button } from "@repo/ui/components/button";
import Icon from "@repo/ui/components/icon";
import { PopoverTrigger } from "@repo/ui/components/popover";
import cn from "@repo/ui/utils/cn";

interface DatePickerTriggerProps {
  value: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

function DatePickerTrigger({
  value,
  placeholder,
  disabled = false,
  className,
}: DatePickerTriggerProps) {
  const displayValue = value || placeholder;
  const hasValue = !!value;

  return (
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !hasValue && "text-muted-foreground",
          className,
        )}
        disabled={disabled}
      >
        <Icon name="calendar" className="mr-2" />
        {displayValue}
      </Button>
    </PopoverTrigger>
  );
}

export { DatePickerTrigger };
