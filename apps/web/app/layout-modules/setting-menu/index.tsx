"use client";

import { Dialog, DialogContent } from "@excolog/ui/components/dialog";

import SettingMenuContent from "./content";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function SettingMenu({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        overlayId="setting-menu"
        className="md:max-w-300 h-svh-6 flex w-full p-0"
      >
        <SettingMenuContent />
      </DialogContent>
    </Dialog>
  );
}

export default SettingMenu;
