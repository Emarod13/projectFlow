// src/app/projects/page.tsx

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectsPage() {
  const projects = [
    "Website Redesign",
    "Mobile App",
    "CRM Migration",
  ];

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project}>
            <CardContent className="p-6">
              {project}
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}