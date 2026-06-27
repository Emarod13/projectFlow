"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProfile } from "@/lib/supabase/profiles";

import { createClient } from "@/lib/supabase/client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RegisterForm() {

  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  
  async function handleRegister() {

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data.user?.id && data.user.email) {
    const { error: profileError } = await createProfile(
      data.user.id,
      data.user.email
    );

    if (profileError) {
      toast.error("User created, but profile could not be created.");
      setLoading(false);
      return;
      }
    }

    toast.success("Account created successfully!");
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

    function redirectToLogin(): void {
        router.push("/login");
    }

    return (

    <Card className="w-full max-w-md">

      <CardHeader>

        <CardTitle className="text-3xl">
          ProjectFlow
        </CardTitle>

        <CardDescription>
          Manage your projects with ease.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-4">

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <Button
          className="w-full"
          disabled={loading}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button
          variant="outline"
          className="w-full"
          disabled={loading}
          onClick={redirectToLogin}
        >
          Log-In
        </Button>

      </CardContent>

    </Card>
  );
}