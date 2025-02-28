
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Smartphone, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ShakeDetection() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    
    if (enabled) {
      toast({
        title: "Shake detection enabled",
        description: "The app will detect if you shake your phone multiple times in rapid succession.",
      });
    } else {
      toast({
        title: "Shake detection disabled",
        description: "Shake monitoring has been turned off.",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-safeher-100 flex items-center justify-center">
              <Smartphone className={cn(
                "h-5 w-5 transition-colors",
                isEnabled ? "text-safeher-600" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <h3 className="font-medium">Shake Detection</h3>
              <p className="text-sm text-muted-foreground">
                Shake your phone 3 times to trigger an emergency alert
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
              When this feature is enabled, shaking your phone rapidly 3 times will trigger an emergency alert.
              This allows you to discreetly call for help without needing to access your screen.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sensitivity</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-safeher-200 bg-safeher-50 text-safeher-700"
              >
                Low
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                Medium
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                High
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Low sensitivity requires more forceful shaking to trigger an alert.
            </p>
          </div>
          
          <div className="rounded-md bg-muted p-3 flex items-center text-sm">
            <Volume2 className="h-4 w-4 mr-2 text-muted-foreground" />
            <p className="text-muted-foreground">
              Test this feature in a safe environment first to get comfortable with how it works.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
