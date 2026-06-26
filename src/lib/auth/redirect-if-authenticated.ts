import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function redirectIfAuthenticated() {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    }

    return supabase;
}