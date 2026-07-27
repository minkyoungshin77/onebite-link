import AppShell from "./_components/AppShell";
import LinkGrid from "./_components/LinkGrid";
import { links } from "./_lib/mock-data";

export default function Home() {
  return (
    <AppShell>
      <LinkGrid links={links} />
    </AppShell>
  );
}
