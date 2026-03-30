import { useState } from "react";
import { Link } from "react-router";
import { Building2, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetUserDetailsById } from "@/apis/hooks/user.hooks";
import { useGetFavoritesCount } from "@/apis/hooks/favorite.hooks";

// const navLinks = [
//   { label: "Buy", href: "/dashboard/buy", icon: Building2 },
// ];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  //mutation
  const { data: userDetails } = useGetUserDetailsById();
  const { data: favoritesCount } = useGetFavoritesCount();
  
  const userInformation = userDetails?.data;
  const SAVED_COUNT = favoritesCount || 0;

  return (
    <TooltipProvider delayDuration={200}>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-secondary">
              GharBazar
            </span>
          </Link>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden md:flex items-center gap-1">
            {/* Saved / Favorites */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link to="/dashboard/saved">
                    <Heart className="h-4.5 w-4.5" />
                    {SAVED_COUNT > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] font-bold rounded-full">
                        {SAVED_COUNT}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Saved properties</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 rounded-full hover:bg-muted"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {userInformation?.userName
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground hidden lg:block">
                    {userInformation?.userName || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/saved"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="h-4 w-4" />
                    Saved Properties
                    {SAVED_COUNT > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {SAVED_COUNT}
                      </Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ── Mobile: Saved + Hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground"
              asChild
            >
              <Link to="/saved">
                <Heart className="h-5 w-5" />
                {SAVED_COUNT > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] font-bold rounded-full">
                    {SAVED_COUNT}
                  </Badge>
                )}
              </Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                {/* Mobile Profile */}
                <div className="flex items-center gap-3 p-6 border-b border-border">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>

                {/* Mobile Nav Links
                <div className="flex flex-col gap-1 p-4">
                  {navLinks.map(({ label, href, icon: Icon }) => {
                    const isActive = location.pathname === href;
                    return (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    );
                  })}

                  <Separator className="my-2" />

                  <Link
                    to="/dashboard/search"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </div> */}

                <div className="absolute bottom-6 left-4 right-4">
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:text-destructive border-destructive/30"
                  >
                    Sign out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </TooltipProvider>
  );
};

export default Navbar;
