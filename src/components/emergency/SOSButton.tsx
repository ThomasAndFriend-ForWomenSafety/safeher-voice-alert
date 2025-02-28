
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
  onActivate: () => void;
  className?: string;
}

export function SOSButton({ onActivate, className }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressProgress, setPressProgress] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const { toast } = useToast();
  
  const pressDuration = 3000; // 3 seconds
  const updateInterval = 100; // Update progress every 100ms

  const handlePressStart = () => {
    setIsPressed(true);
    setPressProgress(0);
    
    // Start the timer
    const timer = setInterval(() => {
      setPressProgress(prev => {
        const newProgress = prev + (updateInterval / pressDuration) * 100;
        return Math.min(newProgress, 100);
      });
    }, updateInterval);
    
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    
    // Clear the timer
    if (pressTimer) {
      clearInterval(pressTimer);
      setPressTimer(null);
    }
    
    // If progress reached 100%, activate SOS
    if (pressProgress >= 100 && !isActivated) {
      setIsActivated(true);
      onActivate();
      toast({
        title: "SOS Activated",
        description: "Emergency contacts are being notified of your situation.",
        variant: "destructive",
      });
    }
    
    // Reset progress if not completed
    if (pressProgress < 100) {
      setPressProgress(0);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (pressTimer) {
        clearInterval(pressTimer);
      }
    };
  }, [pressTimer]);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className="relative">
        {/* Circular progress indicator */}
        <svg
          className="absolute inset-0 -m-1"
          width="calc(100% + 8px)"
          height="calc(100% + 8px)"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted stroke-current"
            strokeWidth="4"
            fill="none"
            cx="50"
            cy="50"
            r="48"
          />
          <circle
            className={`${isActivated ? "text-emergency-500" : "text-safeher-500"} stroke-current transition-all duration-300`}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            cx="50"
            cy="50"
            r="48"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (pressProgress / 100) * 301.59}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        <Button
          className={cn(
            "h-32 w-32 rounded-full text-white relative overflow-hidden transition-all duration-300",
            isPressed 
              ? "scale-95 shadow-inner" 
              : "scale-100 shadow-lg",
            isActivated
              ? "bg-emergency-600 hover:bg-emergency-700"
              : "bg-safeher-600 hover:bg-safeher-700"
          )}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={isPressed ? handlePressEnd : undefined}
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className={cn(
              "h-12 w-12 transition-all duration-300",
              isPressed ? "scale-90" : "scale-100"
            )} />
          </span>
        </Button>
        
        {/* Pulsing rings when activated */}
        {isActivated && (
          <>
            <span className="absolute inset-0 rounded-full bg-emergency-500 opacity-75 animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full bg-emergency-500 opacity-75 animate-pulse-ring animation-delay-1000" />
          </>
        )}
      </div>
      
      <p className={cn(
        "mt-4 font-medium text-lg",
        isActivated ? "text-emergency-600" : "text-safeher-600"
      )}>
        {isActivated ? "SOS Activated" : "Hold to Activate SOS"}
      </p>
      
      {isActivated && (
        <p className="mt-2 text-sm text-muted-foreground">
          Location updates are being sent every 30 seconds
        </p>
      )}
      
      {isActivated && (
        <Button 
          variant="outline" 
          className="mt-6 border-emergency-500 text-emergency-500 hover:bg-emergency-50 hover:text-emergency-600"
          onClick={() => {
            setIsActivated(false);
            setPressProgress(0);
            toast({
              title: "SOS Deactivated",
              description: "Emergency mode has been canceled.",
            });
          }}
        >
          Cancel Emergency
        </Button>
      )}
    </div>
  );
}
