"use client";

import { useLinks } from "@/app/_lib/links-context";
import LinkCard from "./LinkCard";

type LinkGridProps = {
  folderId?: string;
};

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { links: allLinks } = useLinks();
  const links = folderId
    ? allLinks.filter((link) => link.folderId === folderId)
    : allLinks;

  if (links.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-[var(--text-sub)]">
        등록된 링크가 없습니다.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
