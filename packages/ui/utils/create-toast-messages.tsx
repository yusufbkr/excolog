import { toast, ToasterProps } from "sonner";

import Icon from "@repo/ui/components/icon";

interface Props {
  messages: string[];
  options?: ToasterProps["toastOptions"];
}

function createToastMessages({ messages, options }: Props) {
  toast(
    <div className="flex gap-2">
      <Icon name="alert-triangle" className="text-destructive" />
      <div className="space-y-2">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>,
    options,
  );
}

export default createToastMessages;
