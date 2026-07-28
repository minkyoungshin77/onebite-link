"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders } from "./mock-data";
import { Folder } from "./types";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  editFolder: (folderId: string, name: string) => void;
  deleteFolder: (folder: Folder) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      count: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const editFolder = (folderId: string, name: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name } : f)),
    );
  };

  const deleteFolder = (folder: Folder) => {
    setFolders((prev) => prev.filter((f) => f.id !== folder.id));
  };

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, editFolder, deleteFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders는 FoldersProvider 내부에서 사용해야 합니다.");
  }
  return context;
}
