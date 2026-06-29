import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { DeleteProjectButton } from "@/components/projects/delete-project-button";
import { EditProjectDialog } from "@/components/projects/edit-project-dialog";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth/require-user";
import { FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export default async function ProjectsPage() {

  const {supabase,user} = await requireUser();

  const currentUser = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isLeader = currentUser.data?.role === "TEAM_LEADER";

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Projects
            </h1>

            <p className="text-muted-foreground">
              Manage all your projects.
            </p>
          </div>

          {projects.length != 0 && isLeader && <CreateProjectDialog />}
        </div>

      {projects.length == 0  && isLeader &&(
          <EmptyState
            icon={<FolderKanban className="h-10 w-10" />}
            title="No projects yet"
            description="Create your first project to start organizing your work."
            action={<CreateProjectDialog />}
          />
        )}

        {projects.length == 0  && !isLeader &&(
          <EmptyState
            icon={<FolderKanban className="h-10 w-10" />}
            title="No projects yet"
            description="You are not assigned to any proyect yet."
          />
        )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        
        

        
        {projects?.map((project) => (
          <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {project.name}
                    </h2>

                    <p className="text-muted-foreground mt-2">
                      {project.description}
                    </p>

                    <Badge className="mt-4">
                      Active
                    </Badge>
                  </div>

                  {isLeader && (<div className="flex gap-2">
                    <EditProjectDialog
                      id={project.id}
                      currentName={project.name}
                      currentDescription={
                        project.description ?? ""
                      }
                    />

                    <DeleteProjectButton
                      projectId={project.id}
                    />
                  </div>)}
                  
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
    </AppLayout>
  );
}