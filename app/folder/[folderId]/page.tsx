import LinkGrid from "@/components/LinkGrid";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return <LinkGrid folderId={folderId} />;
}
