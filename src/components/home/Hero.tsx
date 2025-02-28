
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-safeher-100 via-background to-background" />
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-5"
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Shield className="mr-1 h-4 w-4 text-safeher-600" />
              <span className="text-safeher-600 font-medium">Women Safety Alert System</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance"
            >
              Your Personal Safety Companion
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-[600px] text-lg text-muted-foreground"
            >
              Travel safely with our advanced alert system that instantly shares your location with trusted contacts during emergencies.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button asChild size="lg" className="bg-safeher-600 text-white hover:bg-safeher-700">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/emergency">Emergency Features</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto lg:ml-auto"
          >
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-safeher-700 via-safeher-500 to-safeher-400 opacity-20" />
              <img
                src="/lovable-uploads/ebb6d709-77c7-4e8a-9684-8a17668ace78.png"
                alt="Women Safety"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
              <div className="absolute bottom-4 left-4 right-4 p-4">
                <div className="glass dark:glass-dark rounded-xl p-4 backdrop-blur-lg">
                  <p className="text-sm font-medium text-foreground">Instant location sharing with trusted contacts during emergencies</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-safeher-200/50 backdrop-blur-xl" />
            <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-safeher-200/50 backdrop-blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
