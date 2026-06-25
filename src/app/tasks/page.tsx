// src/app/tasks/page.tsx

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function TasksPage() {
  const tasks = [
    {
      title: "Create Login Page",
      status: "Pending",
    },
    {
      title: "Build Dashboard",
      status: "In Progress",
    },
    {
      title: "Deploy Application",
      status: "Completed",
    },
  ];

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Tasks
      </h1>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.title}>
            <CardContent className="p-6 flex justify-between">
              <span>{task.title}</span>
              <span>{task.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}