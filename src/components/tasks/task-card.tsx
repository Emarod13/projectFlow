"use client";

import { FileText, FolderKanban, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { EditTaskDialog } from "./edit-task-dialog";
import { DeleteTaskButton } from "./delete-task-button";



import type { Task } from "@/types/task";
import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";
import { getPriorityBadgeClass, getStatusBadgeClass } from "@/lib/badge-utils";

type Props = {
  task: Task;
  projects: Project[];
  profiles: Profile[];
  isLeader: boolean;
};

export function TaskCard({
  task,
  projects,
  profiles,
  isLeader,
}: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow">

      <CardContent className="p-6 space-y-4">

        {/* Header */}

        <div className="flex items-start justify-between">

          <h3 className="font-bold text-lg">
            {task.title}
          </h3>

          <div className="flex gap-2">

            <EditTaskDialog
              task={task}
              projects={projects}
              profiles={profiles}
              isLeader={isLeader}
            />

            {isLeader && (
              <DeleteTaskButton
                id={task.id}
              />
            )}

          </div>

        </div>

        <Separator />

        {/* Body */}

        <div className="space-y-3 text-sm text-muted-foreground">

          <div className="flex items-start gap-2">

            <FileText className="h-4 w-4 shrink-0 mt-0.5" />

            <span>
              {task.description}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <FolderKanban className="h-4 w-4" />

            <span>
              {task.projects?.name}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <User className="h-4 w-4" />

            <span>
              {task.profiles?.email ?? "Unassigned"}
            </span>

          </div>

        </div>

        <Separator />

        {/* Footer */}

        <div className="flex gap-2">

          <Badge className={getStatusBadgeClass(task.status)}>
            {task.status}
          </Badge>

          <Badge className={getPriorityBadgeClass(task.priority)}>
            {task.priority}
          </Badge>

        </div>

      </CardContent>

    </Card>
  );
}