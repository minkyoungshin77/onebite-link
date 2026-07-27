import Header from "./Header";
import Sidebar from "./Sidebar";
import { folders, links } from "../_lib/mock-data";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} totalCount={links.length} />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
