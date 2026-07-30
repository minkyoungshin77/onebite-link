"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { LinkItem } from "./types";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  folderId: string;
};

type EditLinkInput = {
  folderId: string;
  title: string;
  description: string;
};

type LinksContextValue = {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (input: NewLinkInput) => Promise<void>;
  editLink: (linkId: string, input: EditLinkInput) => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let lastUserId: string | null = null;

    const loadLinks = async (userId: string) => {
      const { data, error } = await supabase
        .from("link")
        .select("id, url, title, description, thumbnail_url, folder_id, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("링크 목록을 불러오지 못했습니다.", error);
        return;
      }

      setLinks(
        (data ?? []).map((row) => ({
          id: String(row.id),
          title: row.title ?? "",
          url: row.url,
          description: row.description ?? "",
          thumbnailUrl: row.thumbnail_url ?? "",
          folderId: row.folder_id === null ? "" : String(row.folder_id),
          createdAt: row.created_at,
        })),
      );
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user.id ?? null;
      if (userId === lastUserId) return;

      lastUserId = userId;
      if (userId) {
        loadLinks(userId);
      } else {
        setLinks([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addLink = async (input: NewLinkInput) => {
    if (isAddingLink) return;

    setIsAddingLink(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("link")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.thumbnailUrl,
          folder_id: Number(input.folderId),
        })
        .select("id, url, title, description, thumbnail_url, folder_id, created_at")
        .single();

      if (error || !data) {
        console.error("링크를 추가하지 못했습니다.", error);
        return;
      }

      const newLink: LinkItem = {
        id: String(data.id),
        title: data.title ?? "",
        url: data.url,
        description: data.description ?? "",
        thumbnailUrl: data.thumbnail_url ?? "",
        folderId: data.folder_id === null ? "" : String(data.folder_id),
        createdAt: data.created_at,
      };
      setLinks((prev) => [newLink, ...prev]);
    } finally {
      setIsAddingLink(false);
    }
  };

  const editLink = async (linkId: string, input: EditLinkInput) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("link")
      .update({
        folder_id: Number(input.folderId),
        title: input.title,
        description: input.description,
      })
      .eq("id", Number(linkId));

    if (error) {
      console.error("링크를 수정하지 못했습니다.", error);
      return;
    }

    setLinks((prev) =>
      prev.map((link) =>
        link.id === linkId
          ? {
              ...link,
              folderId: input.folderId,
              title: input.title,
              description: input.description,
            }
          : link,
      ),
    );
  };

  const deleteLink = async (linkId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("link")
      .delete()
      .eq("id", Number(linkId));

    if (error) {
      console.error("링크를 삭제하지 못했습니다.", error);
      return;
    }

    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  };

  return (
    <LinksContext.Provider
      value={{ links, isAddingLink, addLink, editLink, deleteLink }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks는 LinksProvider 내부에서 사용해야 합니다.");
  }
  return context;
}
