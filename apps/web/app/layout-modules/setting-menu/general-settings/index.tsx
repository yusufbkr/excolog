"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@excolog/ui/components/dialog";
import Icon from "@excolog/ui/components/icon";
import { Separator } from "@excolog/ui/components/separator";
import { Skeleton } from "@excolog/ui/components/skeleton";

import Field from "./field";

function GeneralSettings() {
  const isLoadingSettings = false;
  const settings: {
    id: number;
    key: string;
    value: string;
    description: string;
  }[] = [];

  return (
    <section className="flex h-full flex-col gap-4">
      <DialogHeader>
        <DialogTitle>
          <Icon name="settings" />
          Ayarlar
        </DialogTitle>
        <DialogDescription>Ayarları burda yönetebilirsiniz.</DialogDescription>
      </DialogHeader>
      <Separator />
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-1 md:divide-x lg:grid-cols-2">
          {isLoadingSettings ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))
          ) : settings.length > 0 ? (
            settings.map((setting) => (
              <Field key={setting.id} setting={setting} />
            ))
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground text-sm">
                Ayarlar bulunamadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GeneralSettings;
