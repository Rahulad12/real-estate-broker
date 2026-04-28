import { useGetAdminStats } from "@/apis/hooks/admin.hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Users, Home, Eye, Heart, TrendingUp, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useGetAdminStats();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-red-200 bg-red-50/30">
          <CardHeader className="space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-red-600 font-bold">
              System Error
            </p>
            <CardTitle className="text-red-900">Failed to Load Dashboard</CardTitle>
            <CardDescription className="text-red-700">Could not fetch admin statistics. Please check your connection or permissions.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Registered on platform"
    },
    {
      title: "Total Properties",
      value: stats?.totalProperties || 0,
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Active listings"
    },
    {
      title: "Total Views",
      value: stats?.totalViews?.toLocaleString() || 0,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Property engagement"
    },
    {
      title: "Total Likes",
      value: stats?.totalLikes || 0,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Saved by users"
    },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary font-bold mb-2">
              System Overview
            </p>
            <h1 className="text-4xl font-bold text-primary tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Management portal for GharBazar Real Estate Brokerage.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2 shrink-0">
            <Link to="/dashboard">
              View Site as User <ExternalLink size={14} />
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, index) => (
            <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon size={22} className={stat.color} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary tracking-tight">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-wider">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Direct access to management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="secondary" className="w-full justify-between group h-12">
                <Link to="/admin/users">
                  Manage Users
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-between group h-12">
                <Link to="/admin/properties">
                  Manage Properties
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between group h-12 border-dashed">
                <div className="flex items-center gap-2 text-muted-foreground">
                  View Reports (Upcoming)
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Trending Properties Preview */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Trending Content
                </CardTitle>
                <CardDescription>High engagement listings on the platform</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {stats?.trendingProperties && stats.trendingProperties.length > 0 ? (
                <div className="space-y-4">
                   <p className="text-sm text-muted-foreground bg-secondary/5 p-4 rounded-lg border border-secondary/10 italic">
                    Currently tracking {stats.trendingProperties.length} high-performing listings. 
                    Detailed property analytics report available in the next system update.
                  </p>
                  <Button asChild variant="link" className="px-0">
                    <Link to="/admin/properties">View all listings to manage engagement</Link>
                  </Button>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                  No engagement data available yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
