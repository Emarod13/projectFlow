"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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

  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: CheckSquare,
    },
  ];
  
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

      

      <nav className="flex flex-col border-b">

        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 border-t p-2 transition-colors hover:bg-muted",
            pathname === "/dashboard" && "bg-muted font-medium"
          )}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        
        <Link
          href="/projects"
          className={cn(
            "flex items-center gap-2 border-t p-2 transition-colors hover:bg-muted",
            pathname === "/projects" && "bg-muted font-medium"
          )}
        >
          <FolderKanban size={18} />
          Projects
        </Link>
        
        <Link
          href="/tasks"
          className={cn(
            "flex items-center gap-2 border-t p-2 transition-colors hover:bg-muted",
            pathname === "/tasks" && "bg-muted font-medium"
          )}
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