"use client";

import { ChangeEvent, ComponentProps, useEffect, useState } from "react";

import { Input } from "@repo/ui/components/input";
import cn from "@repo/ui/utils/cn";
import dayjs from "@repo/ui/utils/dayjs";

type TimeUnit = "seconds" | "minutes" | "hours";

interface DurationInputProps
  extends Omit<ComponentProps<"input">, "onChange" | "value" | "type"> {
  value?: number; // millisecond cinsinden değer
  onChange?: (value: number) => void;
  onBlur?: (e?: ChangeEvent<HTMLInputElement>) => void;
  availableUnits?: TimeUnit[];
}

function DurationInput({
  value = 0,
  onChange,
  onBlur,
  className,
  disabled = false,
  availableUnits = ["seconds", "minutes", "hours"],
}: DurationInputProps) {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // Millisecond'den saat, dakika, saniye'ye çevir
  const convertFromMilliseconds = (milliseconds: number) => {
    const duration = dayjs.duration(milliseconds, "milliseconds");
    const h = Math.floor(duration.asHours());
    const m = Math.floor(duration.asMinutes()) % 60;
    const s = Math.floor(duration.asSeconds()) % 60;
    return { hours: h, minutes: m, seconds: s };
  };

  // Saat, dakika, saniye'den millisecond'e çevir
  const convertToMilliseconds = (h: number, m: number, s: number): number => {
    const duration = dayjs.duration({ hours: h, minutes: m, seconds: s });
    return Math.floor(duration.asMilliseconds());
  };

  // Value değiştiğinde saat, dakika, saniye değerlerini güncelle
  useEffect(() => {
    const { hours: h, minutes: m, seconds: s } = convertFromMilliseconds(value);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [value]);

  const timeUnits = [
    {
      key: "hours" as const,
      value: hours,
      label: "Saat",
      prefix: "sa",
      max: 23,
    },
    {
      key: "minutes" as const,
      value: minutes,
      label: "Dakika",
      prefix: "dk",
      max: 59,
    },
    {
      key: "seconds" as const,
      value: seconds,
      label: "Saniye",
      prefix: "sn",
      max: 59,
    },
  ];

  const updateValue = (unit: TimeUnit, newValue: number) => {
    const options = timeUnits.find((option) => option.key === unit);
    if (options?.max && options.max < newValue) return;

    switch (unit) {
      case "hours":
        setHours(newValue);
        onChange?.(convertToMilliseconds(newValue, minutes, seconds));
        break;
      case "minutes":
        setMinutes(newValue);
        onChange?.(convertToMilliseconds(hours, newValue, seconds));
        break;
      case "seconds":
        setSeconds(newValue);
        onChange?.(convertToMilliseconds(hours, minutes, newValue));
        break;
    }
  };

  const handleChange = (unit: TimeUnit, e: ChangeEvent<HTMLInputElement>) => {
    updateValue(unit, parseInt(e.target.value) || 0);
  };

  const handleKeyDown = (
    unit: TimeUnit,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const currentValue =
      unit === "hours" ? hours : unit === "minutes" ? minutes : seconds;
    if (currentValue === 0 && /[0-9]/.test(e.key)) {
      e.preventDefault();
      updateValue(unit, parseInt(e.key, 10));
    }
  };

  const handleBlur = () => {
    const milliseconds = convertToMilliseconds(hours, minutes, seconds);
    onBlur?.({
      target: {
        value: milliseconds.toString(),
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={cn("flex space-x-2", className)}>
      {timeUnits
        .filter((unit) => availableUnits.includes(unit.key))
        .map((unit) => (
          <div key={unit.key} className="relative flex-1">
            <Input
              inputProps={{
                type: "number",
                value: unit.value,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(unit.key, e),
                onKeyDown: (e) => handleKeyDown(unit.key, e),
                onBlur: handleBlur,
                placeholder: "0",
                disabled,
                min: 0,
                max: unit.max,
                step: 1,
                className:
                  "text-center pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
              }}
            />
            <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs">
              {unit.prefix}
            </span>
          </div>
        ))}
    </div>
  );
}

export default DurationInput;
