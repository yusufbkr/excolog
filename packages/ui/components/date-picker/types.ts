import { DateRange } from "react-day-picker";

export interface BaseDatePickerProps {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  format?: string;
  disablePast?: boolean;
}

export interface SingleDatePickerProps extends BaseDatePickerProps {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
}

export interface RangeDatePickerProps extends BaseDatePickerProps {
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
  numberOfMonths?: number;
}
