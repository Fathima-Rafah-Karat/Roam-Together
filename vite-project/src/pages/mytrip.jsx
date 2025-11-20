import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const upcomingTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    location: "Bali, Indonesia",
    startDate: "Jun 15, 2025",
    endDate: "Jun 22, 2025",
    participants: "8 travelers",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80"
  },
  {
    id: 2,
    title: "Swiss Alps Trek",
    location: "Swiss Alps, Switzerland",
    startDate: "Aug 10, 2025",
    endDate: "Aug 20, 2025",
    participants: "6 travelers",
    status: "pending",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80"
  }
];

const pastTrips = [
  {
    id: 3,
    title: "Tokyo Culture Tour",
    location: "Tokyo, Japan",
    startDate: "Mar 5, 2025",
    endDate: "Mar 10, 2025",
    participants: "12 travelers",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80"
  }
];

export default function MyTrips() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          My Trips
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your booked travel experiences
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
        </TabsList>

        {/* Upcoming Trips */}
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                
                {/* Trip Image */}
                <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Trip Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{trip.title}</CardTitle>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {trip.location}
                      </p>
                    </div>

                    <Badge variant={trip.status === "confirmed" ? "default" : "secondary"}>
                      {trip.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>

                  <div className="grid gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{trip.participants}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button>View Details</Button>
                    <Button variant="outline">Manage Booking</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Past Trips */}
        <TabsContent value="past" className="space-y-4 mt-6">
          {pastTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden opacity-90">
              <div className="flex flex-col md:flex-row">

                {/* Trip Image */}
                <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover grayscale-[30%]"
                  />
                </div>

                {/* Trip Details */}
                <div className="flex-1 p-6">
                  <CardTitle className="text-2xl mb-2">{trip.title}</CardTitle>
                  <p className="text-muted-foreground flex items-center gap-1 mb-4">
                    <MapPin className="h-4 w-4" />
                    {trip.location}
                  </p>

                  <div className="grid gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline">View Memories</Button>
                    <Button variant="outline">Write Review</Button>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </TabsContent>

      </Tabs>
    </div>
  );
}
