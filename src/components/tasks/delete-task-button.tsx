"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  id: string;
};

export function DeleteTaskButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const supabase = createClient();
    const confirmed = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

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
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}