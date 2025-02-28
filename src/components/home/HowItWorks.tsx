
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus, Navigation, Shield, PhoneCall, Check } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Register & Add Contacts",
      description: "Create your account and add trusted emergency contacts who will be notified in case of emergency.",
    },
    {
      icon: Navigation,
      title: "Start Your Journey",
      description: "When you begin a trip, our app starts tracking your location in the background.",
    },
    {
      icon: Shield,
      title: "Stay Protected",
      description: "Our AI continuously monitors for danger signals through voice, movement, and location data.",
    },
    {
      icon: PhoneCall,
      title: "Emergency Response",
      description: "In case of danger, alerts are automatically sent to your emergency contacts and nearby responders.",
    },
    {
      icon: Check,
      title: "Mark Yourself Safe",
      description: "Once you're safe, mark yourself secure to stop the alerts and update your contacts.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple and intuitive process designed to keep you safe at all times.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Line connecting the steps */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-safeher-100 dark:bg-safeher-900 -translate-x-1/2 hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-safeher-100 dark:bg-safeher-900/30 flex items-center justify-center z-10 relative">
                    <step.icon className="h-8 w-8 text-safeher-600 dark:text-safeher-400" />
                  </div>
                  {/* Only show for odd items on mobile, all items on desktop */}
                  <div className="absolute top-full left-1/2 h-full w-0.5 bg-safeher-100 dark:bg-safeher-900 -translate-x-1/2 md:hidden" />
                </div>
              </div>
              
              <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button className="bg-safeher-600 hover:bg-safeher-700">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
