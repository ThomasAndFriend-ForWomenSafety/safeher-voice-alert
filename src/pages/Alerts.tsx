
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Shield, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";

interface Alert {
  id: string;
  type: "emergency" | "warning" | "info";
  title: string;
  message: string;
  location?: string;
  timestamp: Date;
  read: boolean;
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "emergency",
      title: "Emergency Alert",
      message: "Sarah triggered an emergency alert near Downtown.",
      location: "Downtown, Main Street",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      read: false
    },
    {
      id: "2",
      type: "warning",
      title: "Route Deviation",
      message: "You've deviated from your expected route. Stay safe!",
      location: "West End, Park Avenue",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: false
    },
    {
      id: "3",
      type: "info",
      title: "Safe Arrival",
      message: "Emma has marked herself safe.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true
    },
    {
      id: "4",
      type: "info",
      title: "New Safety Tip",
      message: "Check out our latest safety guide for traveling at night.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true
    },
  ]);

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-5 w-5 text-emergency-500" />;
      case "warning":
        return <BellRing className="h-5 w-5 text-amber-500" />;
      case "info":
        return <CheckCircle className="h-5 w-5 text-safe-500" />;
    }
  };

  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : "All caught up!"
              }
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <span className="ml-1 rounded-full bg-safeher-100 px-2 py-0.5 text-xs text-safeher-600">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`flex p-4 rounded-lg border ${
                      !alert.read ? "bg-safeher-50 border-safeher-100" : ""
                    }`}
                    onClick={() => markAsRead(alert.id)}
                  >
                    <div className="mr-4 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      {alert.location && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {alert.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No notifications yet</h3>
                  <p className="text-muted-foreground mt-1">
                    You'll receive alerts here when there are important updates.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="space-y-4">
              {alerts.filter(a => !a.read).length > 0 ? (
                alerts
                  .filter(alert => !alert.read)
                  .map(alert => (
                    <div
                      key={alert.id}
                      className="flex p-4 rounded-lg border bg-safeher-50 border-safeher-100"
                      onClick={() => markAsRead(alert.id)}
                    >
                      <div className="mr-4 mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(alert.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        {alert.location && (
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alert.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No unread notifications</h3>
                  <p className="text-muted-foreground mt-1">
                    You're all caught up!
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="emergency" className="space-y-4">
              {alerts.filter(a => a.type === "emergency").length > 0 ? (
                alerts
                  .filter(alert => alert.type === "emergency")
                  .map(alert => (
                    <div
                      key={alert.id}
                      className={`flex p-4 rounded-lg border ${
                        !alert.read ? "bg-safeher-50 border-safeher-100" : ""
                      }`}
                      onClick={() => markAsRead(alert.id)}
                    >
                      <div className="mr-4 mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(alert.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        {alert.location && (
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alert.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No emergency alerts</h3>
                  <p className="text-muted-foreground mt-1">
                    You have no emergency alerts at this time.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
