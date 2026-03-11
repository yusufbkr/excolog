"use client";

import { Suspense, useEffect, useState } from "react";

import { useTheme } from "next-themes";

import Icon from "@repo/ui/components/icon";
import { Switch } from "@repo/ui/components/switch";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <div className="flex w-full justify-center gap-4 py-2">
        <Icon
          name="sun"
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        />
        <Switch
          className="cursor-pointer"
          checked={resolvedTheme === "dark"}
          onCheckedChange={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
        />
        <Icon
          name="moon"
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      </div>
    </Suspense>
  );
}

export default ThemeToggle;
