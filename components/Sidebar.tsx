"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder } from "@/app/_lib/types";

type SidebarProps = {
  folders: Folder[];
  totalCount: number;
};

export default function Sidebar({ folders, totalCount }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] px-3 py-6">
      <nav className="flex flex-col gap-0.5">
        <Link
          href="/"
          className={`nav-item-hover flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
            pathname === "/"
              ? "bg-[var(--hover-bg)] text-[var(--text)]"
              : "text-[var(--text-sub)]"
          }`}
        >
          <span>All</span>
          <span className="text-xs text-[var(--text-sub)]">{totalCount}</span>
        </Link>

        <ul className="mt-4 flex flex-col gap-0.5">
          {folders.map((folder) => {
            const href = `/folder/${folder.id}`;
            const isActive = pathname === href;

            return (
              <li key={folder.id}>
                <Link
                  href={href}
                  className={`nav-item-hover flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
                    isActive
                      ? "bg-[var(--hover-bg)] font-medium text-[var(--text)]"
                      : "text-[var(--text-sub)]"
                  }`}
                >
                  <span>{folder.name}</span>
                  <span className="text-xs text-[var(--text-sub)]">
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
