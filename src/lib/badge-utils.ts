import { cn } from "@/lib/utils";

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case "Pending":
      return cn(
        "border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      );

    case "In Progress":
      return cn(
        "border-blue-300 bg-blue-100 text-blue-800 hover:bg-blue-100"
      );

    case "Completed":
      return cn(
        "border-green-300 bg-green-100 text-green-800 hover:bg-green-100"
      );

    default:
      return "";
  }
}

export function getPriorityBadgeClass(priority: string) {
  switch (priority) {
    case "Low":
      return cn(
        "border-green-300 bg-green-100 text-green-800 hover:bg-green-100"
      );

    case "Medium":
      return cn(
        "border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      );

    case "High":
      return cn(
        "border-red-300 bg-red-100 text-red-800 hover:bg-red-100"
      );

    default:
      return "";
  }
}