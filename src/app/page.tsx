import { requireUser } from "@/lib/auth/require-user";
import { redirect } from "next/navigation";


export default async function HomePage() {
  await requireUser();

  redirect("/dashboard");
}