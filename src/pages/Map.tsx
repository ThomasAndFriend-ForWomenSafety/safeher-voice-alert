
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Navigation, Shield, Map as MapIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Map() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // In a real implementation, we would integrate with the Google Maps API
  // For now, we'll just simulate the searching experience
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Location found",
        description: `Found location: ${searchQuery}`,
      });
    }, 1500);
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Safe Routes</CardTitle>
              <CardDescription>
                Search for safe routes to your destination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="current-location" className="text-sm font-medium">
                    Current Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="current-location"
                      placeholder="Your location"
                      className="pl-10"
                      value="Current Location"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="Where are you going?"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-safeher-600 hover:bg-safeher-700" 
                  disabled={!searchQuery || loading}
                >
                  {loading ? "Searching..." : "Find Safe Route"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Safe Places Nearby</CardTitle>
              <CardDescription>
                Quickly find emergency locations around you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4 text-safeher-600" />
                Police Stations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4 text-safe-600" />
                Hospitals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                Safe Zones
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Map area */}
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-8rem)]">
            <CardContent className="p-0 h-full">
              <div className="relative h-full w-full bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center p-6">
                  <MapIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Map Visualization</h3>
                  <p className="text-muted-foreground mt-2 mb-6">
                    In a real implementation, this would be integrated with Google Maps API
                    to show safe routes based on crime data and lighting conditions.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="sm">
                      <Navigation className="mr-2 h-4 w-4" />
                      Navigate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="mr-2 h-4 w-4" />
                      Show Safe Areas
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
