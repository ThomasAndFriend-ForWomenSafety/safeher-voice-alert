
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mic, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function VoiceDetection() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const triggerWords = ["help", "emergency", "danger", "stop", "police"];

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    
    if (enabled) {
      toast({
        title: "Voice detection enabled",
        description: "The app will listen for keywords that indicate you're in danger.",
      });
    } else {
      toast({
        title: "Voice detection disabled",
        description: "Voice monitoring has been turned off.",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-safeher-100 flex items-center justify-center">
              <Mic className={cn(
                "h-5 w-5 transition-colors",
                isEnabled ? "text-safeher-600" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <h3 className="font-medium">Voice Detection</h3>
              <p className="text-sm text-muted-foreground">
                Detects panic in your voice and trigger alerts
              </p>
            </div>
          </div>
          <Switch 
            checked={isEnabled} 
            onCheckedChange={handleToggle}
          />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full flex items-center justify-center text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show details
            </>
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How it works</h4>
            <p className="text-sm text-muted-foreground">
              Our app uses AI-powered voice analysis to detect signs of distress in your voice. 
              When enabled, it will listen for specific trigger words and analyze voice patterns 
              to identify emergency situations.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Trigger Words</h4>
            <div className="flex flex-wrap gap-2">
              {triggerWords.map(word => (
                <div 
                  key={word} 
                  className="px-2 py-1 text-xs rounded-full bg-safeher-50 text-safeher-700 border border-safeher-100"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-md bg-muted p-3 flex items-center text-sm">
            <Volume2 className="h-4 w-4 mr-2 text-muted-foreground" />
            <p className="text-muted-foreground">
              Your microphone will only be used to detect emergency keywords.
              Audio is processed locally and is not stored or sent to any servers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
