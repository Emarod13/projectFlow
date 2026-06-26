"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  id: string;
};

export function DeleteTaskButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const supabase = createClient();
    

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message)
      return;
    }

    toast.success("Task deleted successfully");
    router.refresh();
  }

  return (
    <DeleteConfirmationDialog

        title="Delete Task"

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