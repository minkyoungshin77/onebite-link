"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Folder } from "./types";

type FoldersContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  editFolder: (folderId: string, name: string) => Promise<void>;
  deleteFolder: (folder: Folder) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const loadFolders = async () => {
      const { data, error } = await supabase
        .from("folder")
        .select("id, name")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("폴더 목록을 불러오지 못했습니다.", error);
        return;
      }

      setFolders(
        (data ?? []).map((row) => ({
          id: String(row.id),
          name: row.name,
          count: 0,
        })),
      );
    };

    loadFolders();
  }, []);

  const addFolder = async (name: string) => {
    if (isAddingFolder) return;

    setIsAddingFolder(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folder")
        .insert({ name })
        .select("id, name")
        .single();

      if (error || !data) {
        console.error("폴더를 추가하지 못했습니다.", error);
        return;
      }

      const newFolder: Folder = {
        id: String(data.id),
        name: data.name,
        count: 0,
      };
      setFolders((prev) => [...prev, newFolder]);
    } finally {
      setIsAddingFolder(false);
    }
  };

  const editFolder = async (folderId: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folder")
      .update({ name })
      .eq("id", Number(folderId));

    if (error) {
      console.error("폴더 이름을 수정하지 못했습니다.", error);
      return;
    }

    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name } : f)),
    );
  };

  const deleteFolder = (folder: Folder) => {
    setFolders((prev) => prev.filter((f) => f.id !== folder.id));
  };

  return (
    <FoldersContext.Provider
      value={{ folders, isAddingFolder, addFolder, editFolder, deleteFolder }}
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
