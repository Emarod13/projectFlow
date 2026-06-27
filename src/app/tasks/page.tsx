import { AppLayout } from "@/components/layout/app-layout";
import { requireUser } from "@/lib/auth/require-user";

import { getProfiles } from "@/lib/supabase/profiles";


import type { Task } from "@/types/task";
import { TasksView } from "@/components/tasks/task-view";


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

      <TasksView
        tasks={tasks ?? []}
        projects={projects ?? []}
        profiles={profiles ?? []}
      />

    </AppLayout>
  );
}