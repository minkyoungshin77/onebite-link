import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        한입 링크 테스트 로그
      </h1>
      <Link
        href="/new"
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        + 새 링크
      </Link>
    </header>
  );
}
