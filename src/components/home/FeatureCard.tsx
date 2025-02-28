
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-md transition-all hover:shadow-lg",
      className
    )}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-safeher-50 text-safeher-600 mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-safeher-50/0 via-safeher-50/0 to-safeher-50 opacity-0 transition-all duration-500 group-hover:opacity-100" />
    </div>
  );
}
