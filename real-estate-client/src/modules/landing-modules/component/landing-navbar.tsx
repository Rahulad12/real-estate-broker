import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">
            GharBazar
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="h-9 text-sm font-medium bg-primary hover:bg-primary/90">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};