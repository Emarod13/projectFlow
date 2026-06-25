"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  id: string;
  currentName: string;
  currentDescription: string;
};

export function EditProjectDialog({
  id,
  currentName,
  currentDescription,
}: Props) {
  const [name, setName] = useState(currentName);
  const [description, setDescription] =
    useState(currentDescription);

  async function handleUpdate() {
    const { error } = await supabase
      .from("projects")
      .update({
        name,
        description,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <Button
            className="w-full"
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}