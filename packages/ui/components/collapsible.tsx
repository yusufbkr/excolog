"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

function Collapsible(props: CollapsiblePrimitive.CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger(
  props: CollapsiblePrimitive.CollapsibleTriggerProps,
) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent(
  props: CollapsiblePrimitive.CollapsibleContentProps,
) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
