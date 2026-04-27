import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(3,113,113,0.08),transparent_50%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 mb-8">
          <ShieldCheck className="h-4 w-4 text-secondary" />
          <span className="text-xs font-medium text-muted-foreground">
            Trusted by 10,000+ Property Seekers
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-primary mb-6 leading-tight">
          Find Your Perfect
          <span className="block text-secondary">Place to Call Home</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-secondary-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Browse thousands of verified properties. From cozy apartments to luxurious villas, discover the space that matches your lifestyle.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            asChild 
            size="lg" 
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Link to="/register">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/5"
          >
            <Link to="/browse">
              Browse Properties
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "5K+", label: "Properties" },
            { value: "2K+", label: "Happy Clients" },
            { value: "50+", label: "Cities" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};