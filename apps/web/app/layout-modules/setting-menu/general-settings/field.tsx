import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Loading } from "@repo/ui/components/loading";
import { NumberInput } from "@repo/ui/components/number-input";
import { Switch } from "@repo/ui/components/switch";

import getTrueType from "@/utils/get-true-type";

import SETTINGS_INFO from "./settings-info";

const settingFormSchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean()]),
});

type SettingForm = z.infer<typeof settingFormSchema>;

interface Props {
  setting: {
    id: number;
    key: string;
    value: string;
    description: string;
  };
}

function GeneralSettingsField({ setting }: Props) {
  const form = useForm<SettingForm>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: {
      value: setting.value,
    },
  });

  const isUpdatingSetting = false;

  const onSubmit = (data: SettingForm) => {
    const valueType = getTrueType(data.value);

    switch (valueType) {
      case "number":
        data.value = Number(data.value);
        break;
      case "boolean":
        data.value = Boolean(data.value);
        break;
      case "string":
        data.value = String(data.value);
        break;
    }

    // updateSetting({
    //   id: Number(setting.id),
    //   ...data,
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-b py-4 md:p-6"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => {
            const valueType = getTrueType(field.value);
            const label =
              SETTINGS_INFO?.[setting.key as keyof typeof SETTINGS_INFO];

            if (setting.key === "pdf_read_duration") {
              return (
                <FormItem>
                  <FormLabel htmlFor={setting.key}>{label}</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center gap-2">
                      <Input
                        inputProps={{
                          type: "number",
                          min: 1,
                          value: field.value ? Number(field.value) : 1,
                          onChange: (e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : 1);
                          },
                          onBlur: form.handleSubmit(onSubmit),
                        }}
                      />
                      <span className="text-muted-foreground text-sm">sn</span>
                      {isUpdatingSetting && <Loading />}
                    </div>
                  </FormControl>
                  <FormDescription>{setting.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }

            switch (valueType) {
              case "number":
                return (
                  <FormItem>
                    <FormLabel htmlFor={setting.key}>{label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <NumberInput
                          {...field}
                          id={setting.key}
                          min={1}
                          value={field.value ? Number(field.value) : 1}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(Number(value) || 1);
                          }}
                          onBlur={form.handleSubmit(onSubmit)}
                          max={
                            setting.key === "max_applause_per_user"
                              ? 300
                              : undefined
                          }
                        />
                        {isUpdatingSetting && <Loading />}
                      </div>
                    </FormControl>
                    <FormDescription>{setting.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );

              case "boolean":
                return (
                  <FormItem>
                    <FormLabel
                      htmlFor={setting.key}
                      className="bg-input/30 relative flex items-center gap-4 rounded-md border p-4"
                    >
                      <FormControl>
                        <Switch
                          id={setting.key}
                          checked={Boolean(field.value)}
                          onCheckedChange={(checked) => {
                            field.onChange({
                              target: {
                                value: checked,
                              },
                            });
                            form.handleSubmit(onSubmit)();
                          }}
                        />
                      </FormControl>
                      <div className="flex flex-col gap-1">
                        <FormLabel asChild>
                          <span className="text-sm font-medium">{label}</span>
                        </FormLabel>
                        <FormDescription>{setting.description}</FormDescription>
                        <FormMessage />
                      </div>
                      {isUpdatingSetting && <Loading />}
                    </FormLabel>
                  </FormItem>
                );

              default:
                return (
                  <FormItem>
                    <FormLabel htmlFor={setting.key}>{label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          inputProps={{
                            ...field,
                            id: setting.key,
                            value: String(field.value),
                            onBlur: form.handleSubmit(onSubmit),
                          }}
                        />
                        {isUpdatingSetting && <Loading />}
                      </div>
                    </FormControl>
                    <FormDescription>{setting.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
            }
          }}
        />
      </form>
    </Form>
  );
}

export default GeneralSettingsField;
