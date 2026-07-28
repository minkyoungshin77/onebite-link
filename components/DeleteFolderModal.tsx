"use client";

import { Folder } from "@/app/_lib/types";

type DeleteFolderModalProps = {
  folder: Folder;
  onClose: () => void;
  onConfirm: (folder: Folder) => void;
};

export default function DeleteFolderModal({
  folder,
  onClose,
  onConfirm,
}: DeleteFolderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">
          폴더 삭제
        </h2>
        <p className="mt-2 text-sm text-[var(--text-sub)]">
          &lsquo;{folder.name}&rsquo; 폴더를 정말 삭제하시겠습니까? 이 작업은
          되돌릴 수 없습니다.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(folder);
              onClose();
            }}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
