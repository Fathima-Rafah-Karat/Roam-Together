import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TripCard = ({
  id,
  title,
  location,
  start_date,
  end_date,
  participant_count,
  max_participants,
  banner_image,
  organizer,
  onJoin,
}) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <div
        className="relative h-56 overflow-hidden"
        onClick={() => navigate(`/trip/${id}`)}
      >
        {banner_image ? (
          <img
            src={banner_image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <MapPin className="h-16 w-16 text-primary-foreground opacity-50" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="bg-card/90 backdrop-blur-sm border-0">
            <Star className="h-3 w-3 fill-accent text-accent mr-1" />
            {participant_count}/{max_participants}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">{location}</span>
        </div>

        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(start_date)} - {formatDate(end_date)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {participant_count}/{max_participants} travelers joined
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
            <div className="text-sm">
              <div className="font-medium">{organizer?.full_name || "Unknown"}</div>
              <div className="text-xs text-muted-foreground">Organizer</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/trip/${id}`);
              }}
            >
              View
            </Button>
            {onJoin && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onJoin(id);
                }}
              >
                Join
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
