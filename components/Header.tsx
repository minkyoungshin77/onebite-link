"use client";

import Link from "next/link";

type HeaderProps = {
  onNewFolderClick: () => void;
};

export default function Header({ onNewFolderClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
      <h1 className="text-base font-semibold text-[var(--text)]">
        한입 링크 테스트 로그
      </h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNewFolderClick}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--hover-bg)]"
        >
          + 새 폴더
        </button>
        <Link
          href="/new"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          + 새 링크
        </Link>
      </div>
    </header>
  );
}
