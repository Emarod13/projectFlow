import type { Task } from "@/types/task";

type DashboardStats = {
  total: number;

  completed: number;
  pending: number;
  inProgress: number;

  myCompleted: number;
  myPending: number;
  myInProgress: number;
};

export function calculateTaskStats(
  tasks: Task[],
  userId: string
): DashboardStats {

  const stats: DashboardStats = {
    total: 0,

    completed: 0,
    pending: 0,
    inProgress: 0,

    myCompleted: 0,
    myPending: 0,
    myInProgress: 0,
  };

  for (const task of tasks) {
    
    const isMine = task.assigned_to === userId;
    stats.total++;
    switch (task.status) {

      case "Completed":
        stats.completed++;

        if (isMine) {
          stats.myCompleted++;
        }

        break;

      case "Pending":
        stats.pending++;

        if (isMine) {
          stats.myPending++;
        }

        break;

      case "In Progress":
        stats.inProgress++;

        if (isMine) {
          stats.myInProgress++;
        }

        break;
    }
  }

  return stats;
}