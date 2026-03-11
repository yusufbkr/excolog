"use client";

import { useState } from "react";

import { VariantProps } from "class-variance-authority";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { buttonVariants } from "@repo/ui/components/button";
import Icon, { IconListProps } from "@repo/ui/components/icon";

interface AlertProps {
  children: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  onError?: (error: unknown) => void;
  onCancel?: () => void;
  content?: {
    title: string;
    description: string;
    icon?: IconListProps;
  };
  confirm?: {
    children?: React.ReactNode;
    variant?: VariantProps<typeof buttonVariants>["variant"];
  };
  cancel?: {
    children?: React.ReactNode;
    variant?: VariantProps<typeof buttonVariants>["variant"];
  };
}

function AlertModal({
  children: trigger,
  content = {
    title: "Silmek istediğinize emin misiniz?",
    description: "Bu işlem geri alınamaz. İçerik kalıcı olarak silinecek.",
    icon: "alert-triangle",
  },
  confirm = {
    children: "Onayla",
    variant: "destructive",
  },
  cancel = {
    children: "İptal",
    variant: "outline",
  },
  onConfirm,
  onError,
  onCancel,
}: AlertProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);
      await onConfirm();
    } catch (error) {
      onError?.(error);
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col gap-3">
            {content.icon && (
              <Icon name={content.icon} className="text-destructive size-10" />
            )}
            {content.title}
          </AlertDialogTitle>
          <AlertDialogDescription>{content.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={cancel.variant} onClick={handleCancel}>
            {cancel.children}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={confirm.variant}
            onClick={handleConfirm}
            className="cursor-pointer"
          >
            {isLoading && <Icon name="loader" className="animate-spin" />}
            {confirm.children}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertModal;
