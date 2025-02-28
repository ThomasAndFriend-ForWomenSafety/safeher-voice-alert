
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle specific error for unconfirmed email
      if (error.code === "email_not_confirmed") {
        toast({
          title: "Email not confirmed",
          description: "Please check your email and click the confirmation link before logging in.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Left side - animated gradient */}
        <div className="hidden lg:block relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-safeher-400 via-safeher-500 to-safeher-600" />
          <div className="absolute inset-0 opacity-20" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-6 text-white">
            <Shield className="h-12 w-12 mb-4" />
            <div>
              <h1 className="mb-3 text-3xl font-bold">SafeHer</h1>
              <p className="mb-6 text-lg text-white/90">
                Your personal safety companion that protects you wherever you go.
              </p>
              <div className="mt-8 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <p className="text-sm">Instant SOS alerts</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <p className="text-sm">Voice-activated emergency detection</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <p className="text-sm">Real-time location sharing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - form */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
          <Link to="/" className="flex items-center gap-2 mb-8 text-xl font-bold lg:hidden">
            <Shield className="h-6 w-6 text-safeher-600" />
            <span>SafeHer</span>
          </Link>
          
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }
                  })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { 
                      required: "Password is required"
                    })}
                    className={errors.password ? "border-red-500" : ""}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-safeher-600 hover:bg-safeher-700" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-safeher-600 hover:underline">
                Create one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
