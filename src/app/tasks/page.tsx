import { AppLayout } from "@/components/layout/app-layout";
import { requireUser } from "@/lib/auth/require-user";

import { getProfiles } from "@/lib/supabase/profiles";


import type { Task } from "@/types/task";
import { TasksView } from "@/components/tasks/task-view";
import type { Profile } from "@/types/profile";

export default async function TasksPage() {

  const { supabase, user } = await requireUser();

  const { data: profiles, error: profilesError } = await getProfiles();

  const currentUser = profiles?.find(
    (profile) => profile.id === user.id
  );

  let tasksQuery = supabase
    .from("tasks")
    .select(`
      id,
      title,
      description,
      status,
      priority,
      project_id,
      assigned_to,
      projects(name),
      profiles:assigned_to (
        id,
        email
      )
    `);

  if (currentUser?.role === "TEAM_MEMBER") {
    tasksQuery = tasksQuery.eq("assigned_to", user.id);
  }
  
  const {
    data: tasks,
    error: tasksError,
  } = await tasksQuery.order("created_at", {
    ascending: false,
  });

  const {
    data: projects,
    error: projectsError,
  } = await supabase
    .from("projects")
    .select("id, name")
    .order("name");

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
        currentUser = {currentUser ?? null}
      />

    </AppLayout>
  );
}