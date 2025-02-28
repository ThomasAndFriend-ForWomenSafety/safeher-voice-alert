
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, User, Menu, X, MapPin, Settings, Home, LifeBuoy, Bell } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useState(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/map", label: "Safe Route", icon: MapPin },
    { href: "/alerts", label: "Alerts", icon: Bell },
    { href: "/emergency", label: "Emergency", icon: LifeBuoy },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl"
        >
          <Shield className="h-6 w-6 text-safeher-600" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-safeher-600 to-safeher-500">
            SafeHer
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1.5",
                location.pathname === link.href
                  ? "text-safeher-600 dark:text-safeher-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex flex-col space-y-6 pt-6">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                <Shield className="h-6 w-6 text-safeher-600" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-safeher-600 to-safeher-500">
                  SafeHer
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        location.pathname === link.href
                          ? "bg-safeher-50 text-safeher-600 dark:bg-safeher-950/50 dark:text-safeher-400"
                          : "hover:bg-muted"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
