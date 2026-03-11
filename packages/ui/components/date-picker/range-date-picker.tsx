"use client";

import { DateRange } from "react-day-picker";

import { Calendar } from "@repo/ui/components/calendar";
import { Popover, PopoverContent } from "@repo/ui/components/popover";

import { DatePickerTrigger } from "./components/date-picker-trigger";
import { useDatePicker } from "./hooks/use-date-picker";
import { RangeDatePickerProps } from "./types";
import { formatRangeDisplayValue } from "./utils/formatters";

function RangeDatePicker({
  value,
  onChange,
  placeholder = "Tarih aralığı seçin",
  disabled = false,
  className,
  format = "DD MMMM YYYY",
  disablePast = false,
  numberOfMonths = 2,
}: RangeDatePickerProps) {
  const { open, setOpen, getCalendarBaseProps, closeOnSelect } = useDatePicker({
    disablePast,
  });

  const handleSelect = (range: DateRange | undefined) => {
    onChange?.(range);
    closeOnSelect(!!(range?.from && range?.to));
  };

  const displayValue = formatRangeDisplayValue(value, placeholder, format);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DatePickerTrigger
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleSelect}
          numberOfMonths={numberOfMonths}
          {...getCalendarBaseProps()}
        />
      </PopoverContent>
    </Popover>
  );
}

export { RangeDatePicker };
