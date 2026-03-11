import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import Icon from "@repo/ui/components/icon";
import { MultiSelectOption } from "@repo/ui/components/multi-select/index";
import { PopoverTrigger } from "@repo/ui/components/popover";
import cn from "@repo/ui/utils/cn";

interface Props {
  selectedOptions: MultiSelectOption[];
  isDisabled: boolean;
  placeholder: string;
  maxDisplayedItems: number;
  onRemove: (value: string) => void;
}

function SelectTrigger({
  selectedOptions,
  isDisabled,
  placeholder,
  maxDisplayedItems,
  onRemove,
}: Props) {
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        className={cn(
          "h-auto min-h-9 w-full justify-between gap-2",
          selectedOptions.length > 0 && "h-auto py-2",
        )}
        disabled={isDisabled}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {selectedOptions.slice(0, maxDisplayedItems).map((option) => (
                <Badge
                  key={option.value}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {option.icon && (
                    <Icon name={option.icon} className="h-3 w-3" />
                  )}
                  {option.color && (
                    <div
                      className="size-3 rounded-full border"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  {option.label}
                  <span
                    className="flex size-4 cursor-pointer items-center justify-center p-0 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(option.value);
                    }}
                    role="button"
                  >
                    <Icon name="x" className="h-3 w-3" />
                  </span>
                </Badge>
              ))}
              {selectedOptions.length > maxDisplayedItems && (
                <Badge variant="outline">
                  +{selectedOptions.length - maxDisplayedItems}
                </Badge>
              )}
            </>
          )}
        </div>
        <Icon name="chevron-down" className="shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  );
}

export default SelectTrigger;
