import dayjs from "@excolog/ui/utils/dayjs";

const DEFAULT_FORMAT = "DD MMMM YYYY";

export const formatDate = (
  date: Date | undefined,
  format: string = DEFAULT_FORMAT,
): string => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const formatDateRange = (
  from: Date | undefined,
  to: Date | undefined,
  format: string = DEFAULT_FORMAT,
): string => {
  if (!from) return "";
  if (from && !to) {
    return dayjs(from).format(format);
  }
  if (from && to) {
    return `${dayjs(from).format(format)} - ${dayjs(to).format(format)}`;
  }
  return "";
};

export const formatDisplayValue = (
  value: Date | undefined,
  placeholder: string,
  format: string = DEFAULT_FORMAT,
): string => {
  return value ? formatDate(value, format) : placeholder;
};

export const formatRangeDisplayValue = (
  value: { from?: Date; to?: Date } | undefined,
  placeholder: string,
  format: string = DEFAULT_FORMAT,
): string => {
  if (!value?.from) return placeholder;
  return formatDateRange(value.from, value.to, format);
};

export const isDateInPast = (date: Date): boolean => {
  return dayjs(date).isBefore(dayjs().startOf("day"));
};

export const getStartOfDay = (date: Date): Date => {
  return dayjs(date).startOf("day").toDate();
};

export const getEndOfDay = (date: Date): Date => {
  return dayjs(date).endOf("day").toDate();
};

export const hasValue = (value: Date | undefined): boolean => {
  return !!value;
};

export const hasRangeValue = (
  value: { from?: Date; to?: Date } | undefined,
): boolean => {
  return !!value?.from;
};
