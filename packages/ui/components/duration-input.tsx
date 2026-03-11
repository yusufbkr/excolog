"use client";

import { ChangeEvent, ComponentProps } from "react";

import { Input } from "@excolog/ui/components/input";
import cn from "@excolog/ui/utils/cn";
import dayjs from "@excolog/ui/utils/dayjs";

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

  // Value prop'undan saat, dakika, saniye değerlerini türet
  const date = convertFromMilliseconds(value);

  const timeUnits = [
    {
      key: "hours" as const,
      value: date.hours,
      label: "Saat",
      prefix: "sa",
      max: Infinity, // Saat için bir üst sınır belirlemeyelim veya ihtiyaca göre ayarlanabilir
    },
    {
      key: "minutes" as const,
      value: date.minutes,
      label: "Dakika",
      prefix: "dk",
      max: 59,
    },
    {
      key: "seconds" as const,
      value: date.seconds,
      label: "Saniye",
      prefix: "sn",
      max: 59,
    },
  ];

  const updateValue = (unit: TimeUnit, newValue: number) => {
    const options = timeUnits.find((option) => option.key === unit);
    if (options && options.max !== undefined && options.max < newValue) return;

    let newHours = date.hours;
    let newMinutes = date.minutes;
    let newSeconds = date.seconds;

    switch (unit) {
      case "hours":
        newHours = newValue;
        break;
      case "minutes":
        newMinutes = newValue;
        break;
      case "seconds":
        newSeconds = newValue;
        break;
    }

    onChange?.(convertToMilliseconds(newHours, newMinutes, newSeconds));
  };

  const handleChange = (unit: TimeUnit, e: ChangeEvent<HTMLInputElement>) => {
    updateValue(unit, parseInt(e.target.value) || 0);
  };

  const handleKeyDown = (
    unit: TimeUnit,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const currentValue =
      unit === "hours"
        ? date.hours
        : unit === "minutes"
          ? date.minutes
          : date.seconds;
    if (currentValue === 0 && /[0-9]/.test(e.key)) {
      e.preventDefault();
      updateValue(unit, parseInt(e.key, 10));
    }
  };

  const handleBlur = () => {
    onBlur?.({
      target: {
        value: value.toString(),
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
