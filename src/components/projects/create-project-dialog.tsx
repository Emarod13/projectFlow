"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

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

export function CreateProjectDialog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreateProject() {
    const { error } = await supabase.from("projects").insert({
      name,
      description,
    });

    if (error) {
      console.error(error);
      return;
    }

    const router = useRouter();
    router.refresh();
  }

  return (
    <Dialog>
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