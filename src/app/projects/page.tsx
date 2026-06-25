import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { DeleteProjectButton } from "@/components/projects/delete-project-button";

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    return (
      <AppLayout>
        <p>Error: {error.message}</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <CreateProjectDialog />
      </div>

      <div className="space-y-4">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6">
              <h2 className="font-semibold">
                {project.name}
              </h2>

              <p className="text-muted-foreground">
                {project.description}
              </p>
              <DeleteProjectButton
                projectId={project.id}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}