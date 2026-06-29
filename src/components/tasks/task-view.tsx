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
import { TaskCard } from "./task-card";

type Props = {
  tasks: Task[];
  projects: Project[];
  profiles: Profile[];
  currentUser: Profile;
};

export function TasksView({
  tasks,
  projects,
  profiles,
  currentUser
}: Props) {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const [projectFilter, setProjectFilter] =
    useState("all");

  const isLeader = currentUser?.role === "TEAM_LEADER";

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

        {tasks.length != 0 && isLeader && (
          <CreateTaskDialog projects={projects ?? []} profiles={profiles ?? []} />
        )}
      </div>

      

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

      {tasks.length == 0 && isLeader && (
                <EmptyState
                  icon={<CheckSquare className="h-10 w-10" />}
                  title="No tasks yet"
                  description="Create your first task to start tracking work."
                  action={<CreateTaskDialog projects = {projects} profiles = {profiles} />}
                />
                )
              } 

      {tasks.length == 0 && !isLeader && (
                <EmptyState
                  icon={<CheckSquare className="h-10 w-10" />}
                  title="No tasks yet"
                  description="You are not assigned to any task yet."
                />
                )
              }   

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {filteredTasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            projects={projects}
            profiles={profiles}
            isLeader={isLeader}
          />

        ))}

      </div>

    </>

  );
}