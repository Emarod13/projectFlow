"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { createClient } from "@/lib/supabase/client";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Project = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  project_id: string;
};

type Props = {
  task: Task;
  projects: Project[];
};

export function EditTaskDialog({
  task,
  projects,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(task.title);

  const [description, setDescription] = useState(
    task.description ?? ""
  );

  const [projectId, setProjectId] = useState(
    task.project_id
  );

  const [status, setStatus] = useState(task.status);

  const [priority, setPriority] = useState(
    task.priority
  );

  async function handleUpdateTask() {
    const supabase = createClient();
    const { error } = await supabase
      .from("tasks")
      .update({
        title,
        description,
        project_id: projectId,
        status,
        priority,
      })
      .eq("id", task.id);

    if (error) {
      console.error(error);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <Textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <Select
            value={projectId}
            onValueChange={setProjectId}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {projects.map((project) => (
                <SelectItem
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={setStatus}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Pending">
                Pending
              </SelectItem>

              <SelectItem value="In Progress">
                In Progress
              </SelectItem>

              <SelectItem value="Completed">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priority}
            onValueChange={setPriority}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Low">
                Low
              </SelectItem>

              <SelectItem value="Medium">
                Medium
              </SelectItem>

              <SelectItem value="High">
                High
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={handleUpdateTask}
          >
            Save Changes
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}