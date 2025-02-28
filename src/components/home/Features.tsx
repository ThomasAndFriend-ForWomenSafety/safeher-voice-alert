
import { FeatureCard } from "./FeatureCard";
import { Shield, MapPin, Bell, Mic, Map, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: Bell,
      title: "SOS Emergency Alert",
      description: "One-tap emergency alert sends your live location to pre-saved contacts every 30 seconds.",
    },
    {
      icon: Mic,
      title: "Voice Detection",
      description: "Automatically detects distress in your voice and triggers alerts in emergency situations.",
    },
    {
      icon: Map,
      title: "Safe Route Planning",
      description: "Get safe travel recommendations based on crime reports and lighting conditions.",
    },
    {
      icon: MapPin,
      title: "Find Safe Zones",
      description: "Quickly locate nearby police stations, hospitals, and safe zones in your vicinity.",
    },
    {
      icon: UserCheck,
      title: "Trusted Responders",
      description: "Connect with nearby verified volunteers who can assist during emergency situations.",
    },
    {
      icon: Shield,
      title: "Auto-Recording",
      description: "App automatically records video and audio during emergencies for evidence and assistance.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Core Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed with your safety in mind, our application offers a comprehensive set of features to keep you protected.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <FeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
