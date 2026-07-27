export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl: string;
  folderId: string;
  createdAt: string;
};
