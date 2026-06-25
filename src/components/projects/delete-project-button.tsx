"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {
  async function handleDelete() {
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

    window.location.reload();
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