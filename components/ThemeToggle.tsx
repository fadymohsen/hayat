"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 backdrop-blur-md transition-all hover:border-maad-400 hover:text-maad-600 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:border-maad-500"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
}
