"use client";

import { Calendar } from "@excolog/ui/components/calendar";
import { Popover, PopoverContent } from "@excolog/ui/components/popover";

import { DatePickerTrigger } from "./components/date-picker-trigger";
import { useDatePicker } from "./hooks/use-date-picker";
import { SingleDatePickerProps } from "./types";
import { formatDisplayValue } from "./utils/formatters";

function DatePicker({
  value,
  onChange,
  placeholder = "Tarih seçin",
  disabled = false,
  className,
  format = "DD MMMM YYYY",
  disablePast = false,
}: SingleDatePickerProps) {
  const { open, setOpen, getCalendarBaseProps, closeOnSelect } = useDatePicker({
    disablePast,
  });

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    closeOnSelect(!!date);
  };

  const displayValue = formatDisplayValue(value, placeholder, format);

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
          mode="single"
          selected={value}
          onSelect={handleSelect}
          {...getCalendarBaseProps()}
        />
      </PopoverContent>
    </Popover>
  );
}

export { RangeDatePicker } from "./range-date-picker";
export { DatePicker };
export default DatePicker;
