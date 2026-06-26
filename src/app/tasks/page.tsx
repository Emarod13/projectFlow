import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { DeleteTaskButton } from "@/components/tasks/delete-task-button";
import { EditTaskDialog } from "@/components/tasks/edit-task-dialog";
import { requireUser } from "@/lib/auth/require-user";

export default async function TasksPage() {

  const {supabase,user} = await requireUser();
  const [
    { data: tasks, error: tasksError },
    { data: projects, error: projectsError },] = await Promise.all([
  supabase
    .from("tasks")
    .select(`
    id,
    title,
    description,
    status,
    priority,
    project_id,
    projects(name)
    `)
    .order("created_at", { ascending: false }),

  supabase
    .from("projects")
    .select("id, name")
    .order("name"),
  ]);

  if (tasksError || projectsError) {
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

        <CreateTaskDialog projects={projects ?? []} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tasks?.map((task) => (
          <Card
            key={task.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold text-lg">
                    {task.title}
                  </h2>

                  <p className="text-muted-foreground mt-2">
                    {task.description}
                  </p>

                  <p className="text-sm mt-4">
                    {task.projects?.name}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <Badge>
                      {task.status}
                    </Badge>

                    <Badge variant="secondary">
                      {task.priority}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <EditTaskDialog
                    task={task}
                    projects={projects ?? []}
                  />

                  <DeleteTaskButton
                    id={task.id}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}