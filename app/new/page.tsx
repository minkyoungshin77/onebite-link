import AppShell from "../_components/AppShell";
import NewLinkForm from "../_components/NewLinkForm";
import { folders } from "../_lib/mock-data";

export default function NewLinkPage() {
  return (
    <AppShell>
      <NewLinkForm folders={folders} />
    </AppShell>
  );
}
