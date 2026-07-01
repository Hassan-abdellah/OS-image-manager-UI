import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-4 w-full items-center overflow-x-hidden rounded-full dark:bg-black bg-platinum",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full rounded-full flex-1 flex items-center justify-center bg-cerulean transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <span className="text-foreground text-xs">{value || 0}%</span>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
