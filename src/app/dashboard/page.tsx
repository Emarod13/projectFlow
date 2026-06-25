// app/dashboard/page.tsx

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p>Total Projects</p>
            <h2 className="text-3xl font-bold">8</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p>Active Tasks</p>
            <h2 className="text-3xl font-bold">23</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p>Completed Tasks</p>
            <h2 className="text-3xl font-bold">15</h2>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}