"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {
  async function handleDelete() {
    const supabase = createClient();
    const confirmed = confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      console.error(error);
      return;
    }

    const router = useRouter();
    router.refresh();
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
    >
      <Trash2 size={16} />
    </Button>
  );
}