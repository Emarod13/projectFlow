import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { getStatusBadgeClass } from "@/lib/badge-utils";
import { Separator } from "../ui/separator";

type Props = {
  tasks: Task[];
};

export function RecentTasks({ tasks }: Props) {
    return (
        <>
            <Card>

                <CardHeader>

                    <CardTitle>
                        Recent Tasks
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="flex items-center justify-between py-3"
                        >

                            <div>

                                <p className="font-medium">
                                    {task.title}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {task.projects?.name}
                                </p>

                            </div>

                            <Badge
                                className={getStatusBadgeClass(task.status)}
                            >
                                {task.status}
                            </Badge>

                        </div>

                        
 

                    ))}

                </CardContent>

            </Card>   
        
        </>
    )
}