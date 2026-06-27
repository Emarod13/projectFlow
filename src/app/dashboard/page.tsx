import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { requireUser } from "@/lib/auth/require-user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "lucide-react";
import {calculateTaskStats} from "@/lib/calculate-task-stats";

export default async function DashboardPage() {

  const {supabase,user} = await requireUser();

  const [
    { count: projects },
    { data: tasks },
  ] = await Promise.all([

    supabase
      .from("projects")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("tasks")
      .select("*"),
  ]);

  const stats = calculateTaskStats(
  tasks ?? [],
  user?.id ?? "");
  
  
  return (
    <AppLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Welcome back 👋
          </h1>

          <p className="text-muted-foreground">
            {user?.email}
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Projects"
            value={projects ?? 0}
          />

          <StatCard
            title="Tasks"
            value={stats.total}
          />

          <StatCard
            title="Completed"
            value={stats.completed}
          />

          <StatCard
            title="Pending"
            value={stats.pending}
          />

        </div>

        <Card>

          <CardHeader>

            <CardTitle>
              My Tasks
            </CardTitle>

            <CardDescription>
              Overview of your assigned tasks
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-4">

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              

              <StatCard
              title="Pending"
              value={stats.myPending}
              />

              <StatCard
              title="In Progress"
              value={stats.myInProgress}
              />

              <StatCard
              title="Completed"
              value={stats.myCompleted}
              />

            </div>

          </CardContent>

        </Card>

      </div>

    </AppLayout>
  );
}