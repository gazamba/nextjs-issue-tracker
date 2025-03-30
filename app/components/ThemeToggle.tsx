"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { Button, DropdownMenu } from "@radix-ui/themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" size="2">
          <FiSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <FiMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setTheme("light")}>
          <FiSun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("dark")}>
          <FiMoon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("system")}>
          <FiMonitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
