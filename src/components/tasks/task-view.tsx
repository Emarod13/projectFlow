"use client";

import { useMemo, useState } from "react";

import type { Task } from "@/types/task";
import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";

import { TaskFilters } from "./task-filters";
import { CreateTaskDialog } from "./create-task-dialog";
import { CheckSquare, FileText, FolderKanban, User } from "lucide-react";
import { EmptyState } from "../shared/empty-state";
import { Card, CardContent } from "../ui/card";
import { EditTaskDialog } from "./edit-task-dialog";
import { DeleteTaskButton } from "./delete-task-button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { getPriorityBadgeClass, getStatusBadgeClass } from "@/lib/badge-utils";

type Props = {
  tasks: Task[];
  projects: Project[];
  profiles: Profile[];
};

export function TasksView({
  tasks,
  projects,
  profiles,
}: Props) {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const [projectFilter, setProjectFilter] =
    useState("all");

  const [assignedFilter, setAssignedFilter] =
    useState("all");

  const filteredTasks = useMemo(() => {

    return tasks.filter((task) => {

      if (
        search &&
        !task.title
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return false;
      }

      if (
        statusFilter !== "all" &&
        task.status !== statusFilter
      ) {
        return false;
      }

      if (
        priorityFilter !== "all" &&
        task.priority !== priorityFilter
      ) {
        return false;
      }

      if (
        projectFilter !== "all" &&
        task.project_id !== projectFilter
      ) {
        return false;
      }

      if (
        assignedFilter !== "all" &&
        task.profiles?.email !== assignedFilter
      ) {
        console.log(task.assigned_to);
        console.log(assignedFilter);
        return false;
      }

      return true;

    });

  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    projectFilter,
    assignedFilter,
  ]);

  return (

    <>
        <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-muted-foreground">
            Manage all project tasks.
          </p>
        </div>

        {tasks.length != 0 && (
          <CreateTaskDialog projects={projects ?? []} profiles={profiles ?? []} />
        )}
      </div>

      {tasks.length == 0 && (
                <EmptyState
                  icon={<CheckSquare className="h-10 w-10" />}
                  title="No tasks yet"
                  description="Create your first task to start tracking work."
                  action={<CreateTaskDialog projects = {projects} profiles = {profiles} />}
                />
                )
              }

      <TaskFilters

        projects={projects}
        profiles={profiles}

        search={search}
        setSearch={setSearch}

        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}

        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}

        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}

        assignedFilter={assignedFilter}
        setAssignedFilter={setAssignedFilter}

      />



      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {filteredTasks.map((task) => (

          <Card
            key={task.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6 space-y-4">

              {/* Header */}
              <div className="flex items-start justify-between">

                <h3 className="font-bold text-lg">
                  {task.title}
                </h3>

                <div className="flex gap-2">
                  <EditTaskDialog
                    task={task}
                    projects={projects ?? []}
                    profiles={profiles ?? []}
                  />

                  <DeleteTaskButton id={task.id} />
                </div>

              </div>

              <Separator />

              {/* Información */}
              <div className="space-y-3 text-sm text-muted-foreground">

                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{task.description}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  <span>{task.projects?.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{task.profiles?.email ?? "Unassigned"}</span>
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

        ))}

      </div>

    </>

  );
}