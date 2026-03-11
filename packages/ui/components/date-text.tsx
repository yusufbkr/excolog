import cn from "@excolog/ui/utils/cn";
import dayjs from "@excolog/ui/utils/dayjs";

interface Props extends React.ComponentProps<"time"> {
  value?: string | Date | null;
  format?: string;
  relative?: boolean;
  prefix?: string;
}

function DateText({
  value,
  className,
  format = "DD MMM YYYY, HH:mm",
  relative = false,
  prefix = "",
}: Props) {
  if (!value) return null;
  if (!dayjs(value).isValid())
    return (
      <span className={cn("text-foreground text-sm", className)}>
        {String(value)}
      </span>
    );

  const currentDate = relative
    ? dayjs(value).fromNow()
    : dayjs(value).format(format);

  return (
    <time className={cn("text-foreground text-sm", className)}>
      {prefix}
      {currentDate}
    </time>
  );
}

export default DateText;
