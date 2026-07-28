import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
      <h1 className="text-base font-semibold text-[var(--text)]">
        한입 링크 테스트 로그
      </h1>
      <Link
        href="/new"
        className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
      >
        + 새 링크
      </Link>
    </header>
  );
}
