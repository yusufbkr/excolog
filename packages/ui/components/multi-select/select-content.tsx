import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@excolog/ui/components/command";
import Icon from "@excolog/ui/components/icon";
import { MultiSelectOption } from "@excolog/ui/components/multi-select";
import { PopoverContent } from "@excolog/ui/components/popover";
import cn from "@excolog/ui/utils/cn";

interface Props {
  searchable: boolean;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  searchPlaceholder: string;
  emptyText: string;
  filteredOptions: MultiSelectOption[];
  value: string[];
  handleSelect: (optionValue: string) => void;
}

function SelectContent({
  searchable,
  searchValue,
  onSearchValueChange,
  searchPlaceholder,
  emptyText,
  filteredOptions,
  value,
  handleSelect,
}: Props) {
  return (
    <PopoverContent
      className="w-(--radix-popover-trigger-width) p-0"
      align="start"
    >
      <Command shouldFilter={false}>
        {searchable && (
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={onSearchValueChange}
          />
        )}
        <CommandList className="max-h-80">
          {filteredOptions.length === 0 ? (
            <CommandEmpty>{emptyText}</CommandEmpty>
          ) : (
            <CommandGroup>
              {filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={cn(
                        "border-primary flex size-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Icon name="check" className="h-3 w-3" />
                    </div>
                    {option.icon && <Icon name={option.icon} />}
                    {option.color && (
                      <div
                        className="size-3 rounded-full border"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                    <span className="flex-1">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </PopoverContent>
  );
}

export default SelectContent;
