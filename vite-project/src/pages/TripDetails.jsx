import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Users, MapPin, Clock, MessageCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const TripDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTripDetails();
    }
  }, [id, user]);

  const fetchTripDetails = async () => {
    try {
      const { data: tripData, error: tripError } = await supabase
        .from("trips")
        .select(`
          *,
          organizer:profiles!trips_organizer_id_fkey(full_name, avatar_url)
        `)
        .eq("id", id)
        .single();

      if (tripError) throw tripError;

      const { data: participantsData, error: participantsError } = await supabase
        .from("trip_participants")
        .select("user_id")
        .eq("trip_id", id);

      if (participantsError) throw participantsError;

      const participantsWithProfiles = await Promise.all(
        (participantsData || []).map(async (p) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", p.user_id)
            .single();

          return {
            user_id: p.user_id,
            full_name: profile?.full_name,
          };
        })
      );

      const organizerData = Array.isArray(tripData.organizer)
        ? tripData.organizer[0]
        : tripData.organizer;

      setTrip({
        ...tripData,
        organizer: organizerData,
        participants: participantsWithProfiles,
      });

      if (user) {
        setIsParticipant(participantsData.some((p) => p.user_id === user.id));
      }
    } catch (error) {
      toast({
        title: "Error loading trip",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const joinTrip = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from("trip_participants")
        .insert({ trip_id: id, user_id: user.id });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've joined the trip successfully.",
      });

      fetchTripDetails();
    } catch (error) {
      toast({
        title: "Error joining trip",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const leaveTrip = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("trip_participants")
        .delete()
        .eq("trip_id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "You've left the trip.",
      });

      fetchTripDetails();
    } catch (error) {
      toast({
        title: "Error leaving trip",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Trip not found</p>
          <Button className="mt-4" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Banner */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          {trip.banner_image ? (
            <img src={trip.banner_image} alt={trip.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-card/90 backdrop-blur-sm">{trip.status}</Badge>
              {trip.theme && <Badge className="bg-card/90 backdrop-blur-sm">{trip.theme}</Badge>}
            </div>
            <h1 className="text-5xl font-bold text-card mb-2">{trip.title}</h1>
            <div className="flex items-center gap-2 text-card">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{trip.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trip.start_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} - {new Date(trip.end_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.ceil((new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Group Size</p>
                    <p className="text-sm text-muted-foreground">{trip.participants?.length || 0} / {trip.max_participants} travelers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isParticipant && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Group Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate(`/trip/${trip.id}/chat`)}>
                    Open Chat
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      {trip.organizer?.full_name?.[0] || "O"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{trip.organizer?.full_name || "Unknown"}</p>
                    <p className="text-sm text-muted-foreground">Verified Organizer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Travelers ({trip.participants?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trip.participants?.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted">{participant.full_name?.[0] || "T"}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">{participant.full_name || "Traveler"}</p>
                    </div>
                  ))}
                  {(!trip.participants || trip.participants.length === 0) && (
                    <p className="text-sm text-muted-foreground">No travelers yet. Be the first to join!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {user && (
              <Card>
                <CardContent className="pt-6">
                  {isParticipant ? (
                    <Button variant="destructive" className="w-full" onClick={leaveTrip}>
                      Leave Trip
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={joinTrip}>
                      Join This Trip
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
