"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";


import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";

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

import { Plus } from "lucide-react";
import { toast } from "sonner";



type Props = {
  projects: Project[],
  profiles: Profile[];
};

export function CreateTaskDialog({ projects,profiles }: Props) {
  const router = useRouter();


  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");


  async function handleCreateTask() {
    if (!title || !projectId) return;
    const supabase = await createClient();
    const { error } = await supabase
      .from("tasks")
      .insert({
        title,
        description,
        project_id: projectId,
        status,
        priority,
        assigned_to:
            assignedTo || null,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setProjectId("");
    setStatus("Pending");
    setPriority("Medium");
    setOpen(false);
    toast.success("Task created successfully");
    router.refresh();
    
  }

  return (
    <Dialog 
    open={open}
    onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select onValueChange={setProjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project" />
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
              value={assignedTo}
              onValueChange={setAssignedTo}
          >

              <SelectTrigger>

                  <SelectValue
                      placeholder="Assign to"
                  />

              </SelectTrigger>

                      

              <SelectContent>

                <SelectItem
                          key={"Unassigned"}
                          value={""}
                      >

                          Unassigned

                </SelectItem>

                  {profiles.map((profile) => (

                      <SelectItem
                          key={profile?.id}
                          value={profile?.id || ""}
                      >

                          {profile?.email}

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
            onClick={handleCreateTask}
          >
            Create Task
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}