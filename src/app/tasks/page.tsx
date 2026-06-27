import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { DeleteTaskButton } from "@/components/tasks/delete-task-button";
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog";
import { requireUser } from "@/lib/auth/require-user";
import { EmptyState } from "@/components/shared/empty-state";
import { CheckSquare, FolderKanban, User,FileText } from "lucide-react";

import {
  getPriorityBadgeClass,
  getStatusBadgeClass,
} from "@/lib/badge-utils";
import { getProfiles } from "@/lib/supabase/profiles";
import { Separator } from "@/components/ui/separator";

import type { Task } from "@/types/task";


export default async function TasksPage() {

  const {supabase,user} = await requireUser();
  const [
    { data: tasks, error: tasksError },
    { data: projects, error: projectsError },
    ] = await Promise.all([
  supabase
    .from("tasks")
    .select(`
    id,
    title,
    description,
    status,
    priority,
    project_id,
    projects(name),
    profiles:assigned_to (
      email
    )
    `)
    .order("created_at", { ascending: false }),

  supabase
    .from("projects")
    .select("id, name")
    .order("name"),
  ]);

  const { data: profiles, error: profilesError } = await getProfiles();

  if (tasksError || projectsError || profilesError) {
    return (
      <AppLayout>
        <p>Error loading data.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tasks?.map((task) => (
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
    </AppLayout>
  );
}