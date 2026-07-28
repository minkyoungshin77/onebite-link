"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder } from "@/app/_lib/types";
import { useLinks } from "@/app/_lib/links-context";
import { useFolders } from "@/app/_lib/folders-context";

type SidebarProps = {
  onEditClick: (folder: Folder) => void;
  onDeleteClick: (folder: Folder) => void;
};

export default function Sidebar({
  onEditClick,
  onDeleteClick,
}: SidebarProps) {
  const pathname = usePathname();
  const { links } = useLinks();
  const { folders } = useFolders();

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
          <span className="text-xs text-[var(--text-sub)]">
            {links.length}
          </span>
        </Link>

        <ul className="mt-4 flex flex-col gap-0.5">
          {folders.map((folder) => {
            const href = `/folder/${folder.id}`;
            const isActive = pathname === href;
            const count = links.filter(
              (link) => link.folderId === folder.id,
            ).length;

            return (
              <li key={folder.id}>
                <Link
                  href={href}
                  className={`nav-item-hover group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
                    isActive
                      ? "bg-[var(--hover-bg)] font-medium text-[var(--text)]"
                      : "text-[var(--text-sub)]"
                  }`}
                >
                  <span className="truncate">{folder.name}</span>
                  <span className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label={`${folder.name} 폴더 수정`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEditClick(folder);
                      }}
                      className="hidden rounded p-1 text-[var(--text-sub)] hover:bg-[var(--border)] hover:text-[var(--text)] group-hover:block"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M17.414 2.586a2 2 0 0 0-2.828 0L13.5 3.672l3.828 3.828 1.086-1.086a2 2 0 0 0 0-2.828l-1-1Z" />
                        <path d="M12.44 4.732 3 14.172V18h3.828l9.44-9.44-3.828-3.828Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label={`${folder.name} 폴더 삭제`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDeleteClick(folder);
                      }}
                      className="hidden rounded p-1 text-[var(--text-sub)] hover:bg-[var(--border)] hover:text-[var(--error)] group-hover:block"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1a.75.75 0 0 0-.75.75V3H4.5a.75.75 0 0 0 0 1.5h.322l.6 10.19A2 2 0 0 0 7.418 16.5h5.164a2 2 0 0 0 1.996-1.81l.6-10.19h.322a.75.75 0 0 0 0-1.5H12v-1.25a.75.75 0 0 0-.75-.75h-2.5ZM9.5 3V2.5h1V3h-1Zm-1.75 4a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm3.5 0a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <span className="text-xs text-[var(--text-sub)]">
                      {count}
                    </span>
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
