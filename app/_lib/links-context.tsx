"use client";

import { createContext, useContext, useState } from "react";
import { links as initialLinks } from "./mock-data";
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
  addLink: (input: NewLinkInput) => void;
  editLink: (linkId: string, input: EditLinkInput) => void;
  deleteLink: (linkId: string) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = (input: NewLinkInput) => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: input.title,
      url: input.url,
      description: input.description,
      thumbnailUrl: input.thumbnailUrl,
      folderId: input.folderId,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLinks((prev) => [newLink, ...prev]);
  };

  const editLink = (linkId: string, input: EditLinkInput) => {
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

  const deleteLink = (linkId: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  };

  return (
    <LinksContext.Provider
      value={{ links, addLink, editLink, deleteLink }}
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
