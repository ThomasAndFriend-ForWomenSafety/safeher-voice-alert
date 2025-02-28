
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SOSButton } from "@/components/emergency/SOSButton";
import { EmergencyContacts } from "@/components/emergency/EmergencyContacts";
import { VoiceDetection } from "@/components/emergency/VoiceDetection";
import { ShakeDetection } from "@/components/emergency/ShakeDetection";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Emergency() {
  const [sosActive, setSosActive] = useState(false);
  const { toast } = useToast();

  const handleSOSActivate = () => {
    setSosActive(true);
    
    // In a real application, this would trigger location sharing and alerts
    // For now, we'll just console log and show a toast
    console.log("SOS activated, would send location to emergency contacts");
    
    toast({
      title: "Emergency Mode Activated",
      description: "Your location is being shared with your emergency contacts.",
      variant: "destructive",
    });
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Emergency SOS</CardTitle>
              <CardDescription>
                Activate emergency mode to send alerts to your trusted contacts
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center pt-6 pb-10">
              <SOSButton onActivate={handleSOSActivate} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Emergency Settings</CardTitle>
              <CardDescription>
                Configure your emergency response options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <EmergencyContacts />
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <VoiceDetection />
            <ShakeDetection />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
