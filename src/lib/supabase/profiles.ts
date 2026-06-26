import { createClient } from "@/lib/supabase/client";

export async function createProfile(
  id: string,
  email: string
) {
  const supabase = createClient();

  return await supabase
    .from("profiles")
    .insert({
      id,
      email,
      role: "TEAM_MEMBER",
    });
}

export async function getProfiles() {
  const supabase = createClient();

  return await supabase
    .from("profiles")
    .select("id, email, role")
    .order("email");
}