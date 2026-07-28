import Image from "next/image";
import { LinkItem } from "@/app/_lib/types";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--hover-bg)]">
        <Image
          src={link.thumbnailUrl}
          alt={link.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold text-[var(--text)]">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
      </div>
    </a>
  );
}
