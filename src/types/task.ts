export type Task = {
  id: string;
  title: string;
  description: string;

  project_id: string;
  assigned_to: string | null;

  status: string;
  priority: string;

  projects: {
    name: string;
  } | null;

  profiles: {
    email: string;
  } | null;
};