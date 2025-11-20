import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Calendar, AlertCircle, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Notification Data
const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Trip Confirmed",
    message: "Your Bali Adventure trip has been confirmed! Get ready for an amazing experience.",
    time: "2 hours ago",
    read: false,
    icon: CheckCheck,
    variant: "success"
  },
  {
    id: 2,
    type: "update",
    title: "Itinerary Update",
    message: "The Swiss Alps Trek itinerary has been updated. Check the new schedule.",
    time: "5 hours ago",
    read: false,
    icon: Calendar,
    variant: "info"
  },
  {
    id: 3,
    type: "reminder",
    title: "Departure Reminder",
    message: "Your trip to Tokyo starts in 3 days. Don't forget to check your packing list!",
    time: "1 day ago",
    read: true,
    icon: Bell,
    variant: "warning"
  },
  {
    id: 4,
    type: "social",
    title: "New Comment",
    message: "Sarah commented on your blog post '10 Hidden Gems in Bali'",
    time: "2 days ago",
    read: true,
    icon: MessageCircle,
    variant: "default"
  },
  {
    id: 5,
    type: "alert",
    title: "Weather Alert",
    message: "Heavy rain expected in Bali on June 16. Plan indoor activities accordingly.",
    time: "3 days ago",
    read: true,
    icon: AlertCircle,
    variant: "destructive"
  }
];

// Icon color logic — JSX version
const getIconColor = (variant) => {
  switch (variant) {
    case "success": return "text-green-600";
    case "info": return "text-primary";
    case "warning": return "text-amber-600";
    case "destructive": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

export default function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Notifications
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with your travel plans
            {unreadCount > 0 && (
              <Badge className="ml-2" variant="default">
                {unreadCount} new
              </Badge>
            )}
          </p>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        {/* All Notifications */}
        <TabsContent value="all" className="space-y-3 mt-6">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${!notification.read ? "bg-primary/5 border-primary/20" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full bg-muted ${getIconColor(notification.variant)}`}>
                      <notification.icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        {notification.title}
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                        )}
                      </CardTitle>

                      <CardDescription className="text-sm">
                        {notification.message}
                      </CardDescription>

                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        {/* Unread Notifications */}
        <TabsContent value="unread" className="space-y-3 mt-6">
          {notifications
            .filter((n) => !n.read)
            .map((notification) => (
              <Card key={notification.id} className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full bg-muted ${getIconColor(notification.variant)}`}>
                        <notification.icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-base flex items-center gap-2">
                          {notification.title}
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                        </CardTitle>

                        <CardDescription className="text-sm">
                          {notification.message}
                        </CardDescription>

                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        {/* Archived Placeholder */}
        <TabsContent value="archived" className="mt-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No archived notifications</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
