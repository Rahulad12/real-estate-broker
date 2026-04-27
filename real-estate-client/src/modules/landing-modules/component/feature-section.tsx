import { Badge } from "@/components/ui/badge";
import { Building2, Home, Search } from "lucide-react";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Smart Search",
    description: "Find your dream property with advanced filters and real-time listings.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Verified Listings",
    description: "Every property is verified by our team to ensure quality and authenticity.",
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: "Expert Support",
    description: "Our experienced agents are here to guide you every step of the way.",
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
            Everything You Need to Find Home
          </h2>
          <p className="text-secondary-foreground max-w-2xl mx-auto">
            Discover a seamless property search experience with our comprehensive platform designed for modern home seekers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-xl border border-border/60 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};