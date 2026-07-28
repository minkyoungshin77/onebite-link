"use client";

import { useState } from "react";

type NewFolderModalProps = {
  onClose: () => void;
  onCreate: (name: string) => void;
};

export default function NewFolderModal({
  onClose,
  onCreate,
}: NewFolderModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          새 폴더
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="folder-name"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              id="folder-name"
              name="folder-name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="폴더 이름을 입력해주세요"
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--hover-bg)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
