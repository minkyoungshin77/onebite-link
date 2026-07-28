import Header from "./Header";
import Sidebar from "./Sidebar";
import { folders, links } from "@/app/_lib/mock-data";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} totalCount={links.length} />
        <main className="flex-1 px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
