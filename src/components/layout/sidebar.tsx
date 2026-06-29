"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, CheckSquare } from "lucide-react";
import { LogoutButton } from "../auth/logout-botton";
import { User } from "@supabase/supabase-js";
import { CircleUserRound } from "lucide-react";

import { Profile } from "@/types/profile";
type Props = {
  profile: Profile;
  };

export function Sidebar({ profile }: Props) {

  const pathname = usePathname();

  
  return (
  <aside className="flex min-h-screen w-64 flex-col border-r p-4">

    {/* Logo */}
    <h1 className="mb-2 text-2xl font-bold">
      ProjectFlow
    </h1>

    <p className="mb-8 text-sm text-muted-foreground">
      Manage your team's work
    </p>

    {/* Usuario */}
    <div className="mb-8 flex items-center gap-3 rounded-lg border p-3">

      <CircleUserRound className="h-9 w-9 text-muted-foreground" />

      <div className="min-w-0">

        <p className="text-xs text-muted-foreground">
          Signed in as
        </p>

        <p className="truncate text-sm font-medium">
          {profile?.email} {/* en algun futuro deberia ser Username*/}
        </p>

      </div>

    </div>

    {/* Navegación */}
    <nav className="flex-1 border-b">

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

    {/* Footer */}
    <div className="mt-6 border-t pt-4">

      <div className="mb-4">

        <p className="truncate text-sm font-medium">
          {profile?.email} {/* en algun futuro deberia ser Nombre y apellido*/}
        </p>

        <p className="text-xs text-muted-foreground">
          {profile?.role === "TEAM_LEADER"
            ? "🟢 Team Leader"
            : "🔵 Team Member"}
        </p>

      </div>

      <LogoutButton />

    </div>

  </aside>
);
}