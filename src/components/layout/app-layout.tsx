// src/components/layout/app-layout.tsx

import { requireUser } from "@/lib/auth/require-user";
import { Sidebar } from "./sidebar";

export async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = await requireUser();
  return (
    <div className="flex">
      <Sidebar user={user} />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}