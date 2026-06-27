import { RegisterForm } from "@/components/auth/register-form";
import { redirectIfAuthenticated } from "@/lib/auth/redirect-if-authenticated";

export default async function RegisterPage() {

    await redirectIfAuthenticated();
    
      return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
          <RegisterForm />
        </main>
      );
}