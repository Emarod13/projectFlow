// src/components/layout/app-layout.tsx

import { requireUser } from "@/lib/auth/require-user";
import { Sidebar } from "./sidebar";
import { getCurrentProfile } from "@/lib/services/profile-service";

export async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = await requireUser();
  const profile = await getCurrentProfile();
  return (
    <div className="flex">
      <Sidebar user={user} profile={profile} />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}