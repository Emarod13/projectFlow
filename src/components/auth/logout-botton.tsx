"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <Button
    variant="outline"
    className="w-full"
    onClick={handleLogout}
    >
        <LogOut className="mr-2 h-4 w-4" />
                Logout
    </Button>
  );
}