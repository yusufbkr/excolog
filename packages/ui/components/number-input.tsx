import { ChangeEvent, ComponentProps } from "react";

import { Input } from "@excolog/ui/components/input";
import { Slider } from "@excolog/ui/components/slider";
import cn from "@excolog/ui/utils/cn";

interface Props extends ComponentProps<"input"> {
  onBlur?: (e?: ChangeEvent<HTMLInputElement>) => void;
}

function NumberInput({ max = 100, min = 0, step = 1, ...props }: Props) {
  return (
    <div className={cn("flex items-center gap-2", props.className)}>
      <Slider
        min={Number(min)}
        max={Number(max)}
        step={Number(step)}
        value={[Number(props.value)]}
        onValueCommit={() => {
          props.onBlur?.();
        }}
        onValueChange={(value) => {
          if (value?.[0]) {
            props.onChange?.({
              target: {
                value: String(value[0]),
              },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
      />
      <Input
        inputProps={{
          ...props,
          className: "w-30",
          type: "number",
          min: Number(min),
          max: Number(max),
          step: Number(step),
          value: String(props.value),
          onChange: (e) => {
            const value = e.target.value || 0;
            props.onChange?.({
              target: {
                value: String(value),
              },
            } as ChangeEvent<HTMLInputElement>);
          },
          onBlur: props.onBlur,
        }}
        wrapperProps={{
          className: "w-auto",
        }}
      />
    </div>
  );
}

export { NumberInput };
