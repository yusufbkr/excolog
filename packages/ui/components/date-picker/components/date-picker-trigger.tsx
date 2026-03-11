import { Button } from "@excolog/ui/components/button";
import Icon from "@excolog/ui/components/icon";
import { PopoverTrigger } from "@excolog/ui/components/popover";
import cn from "@excolog/ui/utils/cn";

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
