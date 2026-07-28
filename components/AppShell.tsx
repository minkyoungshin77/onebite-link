"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NewFolderModal from "./NewFolderModal";
import EditFolderModal from "./EditFolderModal";
import DeleteFolderModal from "./DeleteFolderModal";
import { folders as initialFolders, links } from "@/app/_lib/mock-data";
import { Folder } from "@/app/_lib/types";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const handleCreateFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      count: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleEditFolder = (folderId: string, name: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name } : f)),
    );
  };

  const handleDeleteFolder = (folder: Folder) => {
    setFolders((prev) => prev.filter((f) => f.id !== folder.id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header onNewFolderClick={() => setIsModalOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          folders={folders}
          totalCount={links.length}
          onEditClick={setFolderToEdit}
          onDeleteClick={setFolderToDelete}
        />
        <main className="flex-1 px-8 py-10">{children}</main>
      </div>

      {isModalOpen && (
        <NewFolderModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateFolder}
        />
      )}

      {folderToEdit && (
        <EditFolderModal
          folder={folderToEdit}
          onClose={() => setFolderToEdit(null)}
          onSave={handleEditFolder}
        />
      )}

      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
          onConfirm={handleDeleteFolder}
        />
      )}
    </div>
  );
}
