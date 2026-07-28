"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLinks } from "@/app/_lib/links-context";
import { useFolders } from "@/app/_lib/folders-context";

export default function NewLinkForm() {
  const router = useRouter();
  const { addLink } = useLinks();
  const { folders } = useFolders();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("링크 주소를 입력해주세요.");
      return;
    }
    if (!folderId) {
      setError("폴더를 선택해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `/api/og?url=${encodeURIComponent(url.trim())}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "링크 정보를 가져오지 못했습니다.");
        return;
      }

      addLink({
        url: data.url,
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        folderId,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-xl flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folder"
          name="folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
        >
          <option value="" disabled>
            폴더를 선택해주세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-[var(--error)]">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 self-start rounded-md bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "확인 중..." : "확인"}
      </button>
    </form>
  );
}
