"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "../shared/delete-confirmation-dialog";

export function DeleteProjectButton({
  projectId,
}: {
  projectId: string;
}) {

  const router = useRouter();
  async function handleDelete() {
    const supabase = createClient();
    
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
    <DeleteConfirmationDialog

        title="Delete Project"

        description="This action cannot be undone."

        onConfirm={handleDelete}

        trigger={
            <Button
                variant="destructive"
                size="icon"
            >
                <Trash2 size={16}/>
            </Button>
        }
    />
  );
}