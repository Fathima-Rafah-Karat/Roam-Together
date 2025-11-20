import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Emma Thompson",
    role: "Solo Traveler",
    image: "bg-gradient-to-br from-primary to-secondary",
    rating: 5,
    text: "RoamTogether changed my life! I've made incredible friends and explored places I never thought I'd visit. The community is so welcoming and supportive.",
  },
  {
    name: "David Kim",
    role: "Adventure Seeker",
    image: "bg-gradient-to-br from-secondary to-accent",
    rating: 5,
    text: "As someone who loves spontaneous adventures, this platform is perfect. I've joined 5 trips so far and each one has been better than the last!",
  },
  {
    name: "Sofia Rodriguez",
    role: "Travel Blogger",
    image: "bg-gradient-to-br from-accent to-primary",
    rating: 5,
    text: "The verified organizers and safety features make me feel secure. I've documented amazing stories and connected with travelers from around the world.",
  },
];

const Testimonials = () => {
  return (
    <section id="stories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Traveler Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our amazing community of adventurers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-[var(--shadow-large)] transition-all duration-300">
              <CardContent className="pt-8 pb-6 px-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-12 h-12 rounded-full ${testimonial.image}`} />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
