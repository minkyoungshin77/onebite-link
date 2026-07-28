import Image from "next/image";
import { LinkItem } from "@/app/_lib/types";

type LinkCardProps = {
  link: LinkItem;
  onDeleteClick: (link: LinkItem) => void;
};

export default function LinkCard({ link, onDeleteClick }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group relative flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
    >
      <button
        type="button"
        aria-label={`${link.title} 링크 삭제`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDeleteClick(link);
        }}
        className="absolute right-2 top-2 z-10 hidden rounded p-1.5 bg-[var(--surface)]/90 text-[var(--text-sub)] hover:bg-[var(--border)] hover:text-[var(--error)] group-hover:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1a.75.75 0 0 0-.75.75V3H4.5a.75.75 0 0 0 0 1.5h.322l.6 10.19A2 2 0 0 0 7.418 16.5h5.164a2 2 0 0 0 1.996-1.81l.6-10.19h.322a.75.75 0 0 0 0-1.5H12v-1.25a.75.75 0 0 0-.75-.75h-2.5ZM9.5 3V2.5h1V3h-1Zm-1.75 4a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm3.5 0a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="relative aspect-video w-full overflow-hidden bg-[var(--hover-bg)]">
        {link.thumbnailUrl && (
          <Image
            src={link.thumbnailUrl}
            alt={link.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
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
