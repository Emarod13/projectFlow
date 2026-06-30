"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }
    
    toast.success("Logged out successfully");
    router.replace("/login");
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