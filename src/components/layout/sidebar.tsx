import Link from "next/link";
import { LayoutDashboard, FolderKanban, CheckSquare } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h1 className="text-xl font-bold mb-8">
        ProjectFlow
      </h1>

      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 p-2 rounded hover:bg-muted"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-2 p-2 rounded hover:bg-muted"
        >
          <FolderKanban size={18} />
          Projects
        </Link>

        <Link
          href="/tasks"
          className="flex items-center gap-2 p-2 rounded hover:bg-muted"
        >
          <CheckSquare size={18} />
          Tasks
        </Link>
      </nav>
    </aside>
  );
}