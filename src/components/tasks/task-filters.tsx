"use client";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";

type Props = {
  projects: Project[];
  profiles: Profile[];

  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  priorityFilter: string;
  setPriorityFilter: (value: string) => void;

  projectFilter: string;
  setProjectFilter: (value: string) => void;

  assignedFilter: string;
  setAssignedFilter: (value: string) => void;
};

export function TaskFilters({
  projects,
  profiles,

  search,
  setSearch,

  statusFilter,
  setStatusFilter,

  priorityFilter,
  setPriorityFilter,

  projectFilter,
  setProjectFilter,

  assignedFilter,
  setAssignedFilter,
}: Props) {

    return (

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">

            <Input
                placeholder="Search task (Title)"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            {/* STATUS */}

            <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
            >

                <SelectTrigger>

                    <SelectValue placeholder="Status" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All Status
                    </SelectItem>

                    <SelectItem value="Pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="In Progress">
                        In Progress
                    </SelectItem>

                    <SelectItem value="Completed">
                        Completed
                    </SelectItem>

                </SelectContent>

            </Select>

            {/* PRIORITY */}

            <Select
                value={priorityFilter}
                onValueChange={setPriorityFilter}
            >

                <SelectTrigger>

                    <SelectValue placeholder="Priority" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All Priorities
                    </SelectItem>

                    <SelectItem value="Low">
                        Low
                    </SelectItem>

                    <SelectItem value="Medium">
                        Medium
                    </SelectItem>

                    <SelectItem value="High">
                        High
                    </SelectItem>

                </SelectContent>

            </Select>

            {/* PROJECT */}

            <Select
                value={projectFilter}
                onValueChange={setProjectFilter}
            >

                <SelectTrigger>

                    <SelectValue placeholder="Project" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All Projects
                    </SelectItem>

                    {projects.map((project) => (

                        <SelectItem
                            key={project.id}
                            value={project.id}
                        >
                            {project.name}
                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

            {/* ASSIGNED */}

            <Select
                value={assignedFilter}
                onValueChange={setAssignedFilter}
            >

                <SelectTrigger>

                    <SelectValue placeholder="Assigned To" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        Everyone
                    </SelectItem>

                    {profiles.map((profile) => (

                        <SelectItem
                            key={profile?.id}
                            value={profile?.email || ""}
                        >
                            {profile?.email}
                        </SelectItem>

                    ))}

                </SelectContent>

            </Select>

        </div>

        );
}