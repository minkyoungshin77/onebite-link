"use client";

import { useState } from "react";
import { useFolders } from "@/app/_lib/folders-context";
import { LinkItem } from "@/app/_lib/types";

type EditLinkModalProps = {
  link: LinkItem;
  onClose: () => void;
  onSave: (
    linkId: string,
    input: { folderId: string; title: string; description: string },
  ) => void;
};

export default function EditLinkModal({
  link,
  onClose,
  onSave,
}: EditLinkModalProps) {
  const { folders } = useFolders();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onSave(link.id, {
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          링크 수정
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-link-folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="edit-link-folder"
              name="edit-link-folder"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-link-title"
              className="text-sm font-medium text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="edit-link-title"
              name="edit-link-title"
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-link-description"
              className="text-sm font-medium text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-link-description"
              name="edit-link-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="설명을 입력해주세요"
              className="resize-none rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
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
