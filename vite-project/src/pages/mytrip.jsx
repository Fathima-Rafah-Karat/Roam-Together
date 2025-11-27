import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyTrips() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchMyTrips = async () => {
    if (!token) return console.error("No token found");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/traveler/mytrip",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpcomingTrips(response.data.upcoming || []);
      setPastTrips(response.data.past || []);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-2 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div>
        <h1 className="text-4xl font-bold">My Trips</h1>
        <p className="text-muted-foreground text-lg">
          Manage your booked travel experiences
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
        </TabsList>

        {/* UPCOMING TRIPS */}
        <TabsContent value="upcoming">
          {upcomingTrips.length === 0 ? (
            <p>No upcoming trips</p>
          ) : (
            upcomingTrips.map((trip) => (
              <Card key={trip._id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 h-48 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <CardTitle className="text-2xl mb-2">{trip.title}</CardTitle>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {trip.location}
                    </p>

                    <div className="grid gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        {trip.startDate} - {trip.endDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        {trip.participants} travelers
                      </div>
                    </div>

                    <Button onClick={() => navigate(`/trip/${trip._id}`)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* PAST TRIPS */}
        <TabsContent value="past">
          {pastTrips.length === 0 ? (
            <p>No past trips</p>
          ) : (
            pastTrips.map((trip) => (
              <Card key={trip._id} className="overflow-hidden opacity-90">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 h-48 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <CardTitle className="text-2xl mb-2">{trip.title}</CardTitle>

                    <p className="text-muted-foreground flex items-center gap-1 mb-4">
                      <MapPin className="h-4 w-4" />
                      {trip.location}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {trip.startDate} - {trip.endDate}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button variant="outline">View Memories</Button>
                      <Button variant="outline">Write Review</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
