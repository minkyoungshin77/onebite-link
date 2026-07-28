"use client";

import { Folder } from "@/app/_lib/types";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <form className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="url"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          폴더
        </label>
        <select
          id="folder"
          name="folder"
          defaultValue=""
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-600"
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
        className="mt-2 self-start rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        저장
      </button>
    </form>
  );
}
