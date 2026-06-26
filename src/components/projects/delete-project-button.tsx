"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {

  const router = useRouter();
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
      toast.error(error.message);
      return;
    }

    
    toast.success("Project deleted successfully");
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