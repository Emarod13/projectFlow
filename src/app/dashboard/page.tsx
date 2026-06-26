import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { requireUser } from "@/lib/auth/require-user";


export default async function DashboardPage() {

  const {supabase,user} = await requireUser();

  const [
    { count: projects },
    { count: tasks },
    { count: completed },
    { count: pending },
    { count: inProgress },
  ] = await Promise.all([

    supabase
      .from("projects")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Completed"),

    supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Pending"),

    supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "In Progress"),

  ]);

  return (
    <AppLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your workspace.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Projects"
          value={projects ?? 0}
        />

        <StatCard
          title="Tasks"
          value={tasks ?? 0}
        />

        <StatCard
          title="Completed"
          value={completed ?? 0}
        />

        <StatCard
          title="Pending"
          value={pending ?? 0}
        />

        <StatCard
          title="In Progress"
          value={inProgress ?? 0}
        />

      </div>

    </AppLayout>
  );
}