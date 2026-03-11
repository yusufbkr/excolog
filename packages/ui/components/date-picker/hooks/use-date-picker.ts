import { useState } from "react";

import dayjs from "@excolog/ui/utils/dayjs";

interface UseDatePickerOptions {
  disablePast?: boolean;
}

export function useDatePicker({
  disablePast = false,
}: UseDatePickerOptions = {}) {
  const [open, setOpen] = useState(false);

  const getCalendarBaseProps = () => ({
    captionLayout: "dropdown" as const,
    startMonth: disablePast
      ? dayjs().toDate()
      : dayjs().subtract(3, "year").toDate(),
    endMonth: dayjs().add(3, "year").toDate(),
    disabled: disablePast
      ? {
          before: dayjs().startOf("day").toDate(),
          after: dayjs().add(3, "year").endOf("day").toDate(),
        }
      : {
          after: dayjs().add(3, "year").endOf("day").toDate(),
        },
  });

  const closeOnSelect = (condition: boolean) => {
    if (condition) {
      setOpen(false);
    }
  };

  return {
    open,
    setOpen,
    getCalendarBaseProps,
    closeOnSelect,
  };
}
