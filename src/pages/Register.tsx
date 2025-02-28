
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<RegisterFormData>();

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    
    try {
      setIsLoading(true);
      await signUp(data.email, data.password, data.name);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
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
              <h1 className="mb-3 text-3xl font-bold">Join SafeHer Today</h1>
              <p className="mb-6 text-lg text-white/90">
                Create your account and stay protected wherever you go.
              </p>
              <div className="mt-8 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <p className="text-sm">Add trusted emergency contacts</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <p className="text-sm">Get safe route recommendations</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <p className="text-sm">Connect with verified responders nearby</p>
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
                Create an account
              </h1>
              <p className="text-muted-foreground">
                Enter your details to create your account
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

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
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", { 
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-safeher-600 hover:bg-safeher-700" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-safeher-600 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
