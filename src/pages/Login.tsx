
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual authentication once Supabase is connected
      console.log("Login attempt:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
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
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-6 text-white">
            <Shield className="h-12 w-12 mb-4" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
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
            </motion.div>
          </div>
        </div>
        
        {/* Right side - form */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
          <Link to="/" className="flex items-center gap-2 mb-8 text-xl font-bold lg:hidden">
            <Shield className="h-6 w-6 text-safeher-600" />
            <span>SafeHer</span>
          </Link>
          
          <AuthForm mode="login" onSubmit={handleSubmit} isLoading={isLoading} />
          
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-safeher-600 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
