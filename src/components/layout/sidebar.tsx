import Link from "next/link";
import { LayoutDashboard, FolderKanban, CheckSquare } from "lucide-react";
import { LogoutButton } from "../auth/logout-botton";
import { User } from "@supabase/supabase-js";
import { CircleUserRound } from "lucide-react";
import { Separator } from "../ui/separator";
type Props = {
  user: User;
  };

export function Sidebar({ user }: Props) {
  
  return (
    <aside className="w-64 border-r min-h-screen p-4 flex flex-col">

      <h1 className="text-xl font-bold mb-8">
        ProjectFlow
      </h1>

      <div className="mb-8 flex items-center gap-3 rounded-lg border p-3">

        <CircleUserRound className="h-9 w-9 text-muted-foreground" />

        <div className="min-w-0">

          <p className="text-xs text-muted-foreground">
            Signed in as
          </p>

          <p className="truncate text-sm font-medium">
            {user.email}
          </p>

        </div>

      </div>

      <Separator className="my-2" />

      <nav className="flex flex-col gap-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-2 p-2 rounded hover:bg-muted"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Separator className="my-3" />
        <Link
          href="/projects"
          className="flex items-center gap-2 p-2 rounded hover:bg-muted"
        >
          <FolderKanban size={18} />
          Projects
        </Link>
        <Separator className="my-3" />
        <Link
          href="/tasks"
          className="flex items-center gap-2 p-2 rounded hover:bg-muted"
        >
          <CheckSquare size={18} />
          Tasks
        </Link>

      </nav>

      <div className="mt-auto pt-4">
        <LogoutButton />
      </div>

    </aside>
   
  );
}