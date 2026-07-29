"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NewFolderModal from "./NewFolderModal";
import EditFolderModal from "./EditFolderModal";
import DeleteFolderModal from "./DeleteFolderModal";
import { Folder } from "@/app/_lib/types";
import { LinksProvider } from "@/app/_lib/links-context";
import { FoldersProvider, useFolders } from "@/app/_lib/folders-context";

type AppShellProps = {
  children: React.ReactNode;
};

function AppShellInner({ children }: AppShellProps) {
  const { addFolder, editFolder, deleteFolder, isAddingFolder } =
    useFolders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header onNewFolderClick={() => setIsModalOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          onEditClick={setFolderToEdit}
          onDeleteClick={setFolderToDelete}
        />
        <main className="flex-1 px-8 py-10">{children}</main>
      </div>

      {isModalOpen && (
        <NewFolderModal
          onClose={() => setIsModalOpen(false)}
          onCreate={addFolder}
          isCreating={isAddingFolder}
        />
      )}

      {folderToEdit && (
        <EditFolderModal
          folder={folderToEdit}
          onClose={() => setFolderToEdit(null)}
          onSave={editFolder}
        />
      )}

      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
          onConfirm={deleteFolder}
        />
      )}
    </div>
  );
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <FoldersProvider>
      <LinksProvider>
        <AppShellInner>{children}</AppShellInner>
      </LinksProvider>
    </FoldersProvider>
  );
}
