"use client";

import { useMemo, useState } from "react";

import { IconListProps } from "@repo/ui/components/icon";
import { Popover } from "@repo/ui/components/popover";

import SelectContent from "./select-content";
import SelectTrigger from "./select-trigger";

export interface MultiSelectOption {
  value: string;
  label: string;
  color?: string;
  icon?: IconListProps;
}

interface Props {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  maxDisplayedItems?: number;
}

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Seçiniz...",
  disabled = false,
  searchable = true,
  searchPlaceholder = "Ara...",
  emptyText = "Sonuç bulunamadı",
  maxDisplayedItems = 3,
}: Props) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedOptions = useMemo(() => {
    return options.filter((option) => value.includes(option.value));
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, searchValue, searchable]);

  const handleSelect = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    if (isSelected) {
      onValueChange(value.filter((v) => v !== optionValue));
    } else {
      onValueChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onValueChange(value.filter((v) => v !== optionValue));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <SelectTrigger
        selectedOptions={selectedOptions}
        isDisabled={disabled}
        placeholder={placeholder}
        maxDisplayedItems={maxDisplayedItems}
        onRemove={handleRemove}
      />

      <SelectContent
        searchable={searchable}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        searchPlaceholder={searchPlaceholder}
        emptyText={emptyText}
        filteredOptions={filteredOptions}
        value={value}
        handleSelect={handleSelect}
      />
    </Popover>
  );
}

export { MultiSelect };
