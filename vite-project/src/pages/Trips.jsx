import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock } from "lucide-react"

const trips = [
  {
    id: 1,
    title: "Beach Trip",
    location: "Goa",
    date: "2025-12-05",
    status: "upcoming",
    image: "/tropical-beach-paradise.png",
    price: "$299",
    duration: "3 days",
    participants: "12 people",
    description: "Experience the pristine beaches and water sports activities",
    tags: ["Beach", "Water Sports"],
  },
  {
    id: 2,
    title: "Mountain Hike",
    location: "Himalayas",
    date: "2025-12-10",
    status: "upcoming",
    image: "/majestic-mountain-landscape.jpg",
    price: "$399",
    duration: "5 days",
    participants: "8 people",
    description: "Trek through stunning mountain peaks and scenic valleys",
    tags: ["Adventure", "Hiking"],
  },
  {
    id: 3,
    title: "City Tour",
    location: "Mumbai",
    date: "2025-11-10",
    status: "completed",
    image: "/urban-city-skyline.jpg",
    price: "$199",
    duration: "2 days",
    participants: "15 people",
    description: "Explore the vibrant culture and landmarks of the city",
    tags: ["City", "Culture"],
  },
]

export default function Trips({ onSelectTrip }) {
  return (
    <div className="container mx-auto px-4  pb-12">
        <h1 className="text-4xl text-blue-400 font-bold mb-2">Trips </h1>
        <p className="text-muted-foreground mb-8">Manage and view your data </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="relative h-80 rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => console.log(`Navigate to trip ${trip.id}`)}
        >
          {/* Background image */}
          <img
            src={trip.image || "/placeholder.svg"}
            alt={trip.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {/* Tags at top */}
            <div className="flex flex-wrap gap-2">
              {trip.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Content at bottom */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{trip.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-200">
                  <MapPin className="w-4 h-4" />
                  <span>{trip.location}</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-white">{trip.price}</div>

              <p className="text-sm text-gray-100 line-clamp-2">{trip.description}</p>

              {/* Trip details */}
              <div className="flex gap-4 text-xs text-gray-200">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{trip.participants}</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="sm"
                onClick={() => onSelectTrip && onSelectTrip(trip)}
              >
                View Details
              </Button>
            </div>
          </div>

          {/* Status badge overlay */}
          <div className="absolute top-4 right-4">
            <Badge
              variant={trip.status === "completed" ? "secondary" : "default"}
              className={
                trip.status === "completed"
                  ? "bg-gray-500/80 text-white"
                  : "bg-green-500/80 text-white"
              }
            >
              {trip.status === "completed" ? "Completed" : "Upcoming"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
