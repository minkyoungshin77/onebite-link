"use client";

import { Folder } from "@/app/_lib/types";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <form className="flex max-w-xl flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
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
          defaultValue=""
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

      <button
        type="submit"
        className="mt-2 self-start rounded-md bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
      >
        저장
      </button>
    </form>
  );
}
