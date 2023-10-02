"use client";

import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/20/solid";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  // Clean way to know when client running to show changes
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="rounded-full bg-slate-200 dark:bg-slate-700 border flex flex-none border-slate-900 dark:border-slate-50"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <button className={clsx("p-[1px] my-1 ml-1 w-6 h-6 rounded-full", mounted && theme === "light" && "bg-gray-300")}>
        <SunIcon />
      </button>
      <button className={clsx("p-[1px] my-1 mr-1 w-6 h-6 rounded-full", mounted && theme === "dark" && "bg-gray-500")}>
        <MoonIcon />
      </button>
    </div>
  );
}
