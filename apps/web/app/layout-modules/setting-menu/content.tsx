"use client";

import { Fragment, useState } from "react";

import Icon, { IconListProps } from "@repo/ui/components/icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import cn from "@repo/ui/utils/cn";

import GeneralSettings from "./general-settings";

type AllSettingKeys = "general-settings";

type SettingPageItem = {
  group: string;
  items: Partial<
    Record<
      AllSettingKeys,
      {
        icon: IconListProps;
        label: string;
        disabled?: boolean;
        component: React.ReactNode;
      }
    >
  >;
};

function SettingsContent() {
  const [activePage, setActivePage] =
    useState<AllSettingKeys>("general-settings");
  const isAdmin = true;

  const settingPageItems: SettingPageItem[] = [
    {
      group: "Genel Ayarlar",
      items: {
        ...(isAdmin
          ? {
              "general-settings": {
                icon: "settings",
                label: "Ayarlar",
                component: <GeneralSettings />,
              },
            }
          : {}),
      },
    },
  ];

  return (
    <>
      <Tabs
        value={activePage}
        onValueChange={(v) => setActivePage(v as AllSettingKeys)}
        orientation="vertical"
        className="md:max-w-300 flex size-full max-h-[calc(100vh-6rem)] max-w-[calc(100vw-2rem)] flex-row gap-6 p-4 md:pl-0"
      >
        <TabsList className="hidden h-auto w-64 flex-col items-start justify-start gap-4 overflow-y-auto rounded-none border-r bg-transparent p-0 px-4 md:flex">
          {settingPageItems.map(({ group, items }, i, arr) => {
            const mapItems = Object.entries(items);
            if (!mapItems.length) return null;
            return (
              <Fragment key={group}>
                <div className="flex w-full flex-col gap-2">
                  <span className="text-muted-foreground text-xs font-medium">
                    {group}
                  </span>
                  {Object.entries(items).map(([key, page]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className={cn(
                        "group w-full justify-start !border-none px-2 py-1",
                        {
                          "bg-background": activePage === key,
                          "opacity-50": page.disabled,
                        },
                      )}
                      disabled={page.disabled}
                    >
                      <Icon
                        name={page.icon}
                        className={cn("group-hover:text-foreground", {
                          "text-foreground": activePage === key,
                          "text-muted-foreground opacity-50": page.disabled,
                        })}
                      />
                      <span
                        className={cn(
                          "text-muted-foreground text-sm font-normal",
                          {
                            "text-foreground": activePage === key,
                          },
                        )}
                      >
                        {page.label}
                      </span>
                      <Icon
                        name="chevron-right"
                        className={cn("ml-auto opacity-0", {
                          "opacity-100": activePage === key,
                        })}
                      />
                    </TabsTrigger>
                  ))}
                </div>
                {i < arr.length - 1 && <Separator />}
              </Fragment>
            );
          })}
        </TabsList>

        <div className="md:min-w-sm relative w-full flex-1">
          <div className="absolute left-0 mb-4 md:hidden">
            <Select
              defaultValue={activePage}
              onValueChange={(page) => setActivePage(page as AllSettingKeys)}
            >
              <SelectTrigger className="!leading-0 !h-auto border-none p-0 text-lg font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {settingPageItems.map(({ group, items }) => (
                  <SelectGroup key={group}>
                    <SelectLabel className="text-muted-foreground mb-1 mt-2 px-2 py-1 text-sm">
                      {group}
                    </SelectLabel>
                    {Object.entries(items).map(([key, page]) => (
                      <SelectItem key={key} value={key}>
                        <Icon name={page.icon} />
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {settingPageItems.flatMap(({ items }) =>
            Object.entries(items).map(([key, page]) => (
              <TabsContent
                key={key}
                value={key}
                className="flex h-full flex-col gap-4 [&_[data-slot=dialog-title]]:pointer-events-none [&_[data-slot=dialog-title]]:opacity-0 md:[&_[data-slot=dialog-title]]:opacity-100"
              >
                {page.component}
              </TabsContent>
            )),
          )}
        </div>
      </Tabs>
    </>
  );
}

export default SettingsContent;
