import { requireUser } from "../auth/require-user";

export async function getCurrentProfile() {
  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}