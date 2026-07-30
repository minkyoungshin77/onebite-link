import type { Metadata } from "next";
import LinkGrid from "@/components/LinkGrid";

export const metadata: Metadata = {
  title: "폴더별 링크",
};

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return <LinkGrid folderId={folderId} />;
}
