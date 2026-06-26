"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function CreateProjectDialog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  async function handleCreateProject() {
    const supabase = createClient();
    const { error } = await supabase.from("projects").insert({
      name,
      description,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    
    toast.success("Project created successfully");
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleCreateProject}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}