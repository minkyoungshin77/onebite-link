"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder } from "../_lib/types";

type SidebarProps = {
  folders: Folder[];
  totalCount: number;
};

export default function Sidebar({ folders, totalCount }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 px-4 py-6 dark:border-zinc-800">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === "/"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          }`}
        >
          <span>All</span>
          <span className="text-xs opacity-70">{totalCount}</span>
        </Link>

        <ul className="mt-4 flex flex-col gap-1">
          {folders.map((folder) => {
            const href = `/folder/${folder.id}`;
            const isActive = pathname === href;

            return (
              <li key={folder.id}>
                <Link
                  href={href}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span>{folder.name}</span>
                  <span
                    className={`text-xs ${
                      isActive
                        ? "opacity-70"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {folder.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
