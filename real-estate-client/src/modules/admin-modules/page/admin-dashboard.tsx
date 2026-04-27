import { useGetAdminStats } from "@/apis/hooks/admin.hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Users, Home, Eye, Heart, TrendingUp } from "lucide-react";
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
        <Card className="w-full max-w-md">
          <CardHeader className="mb-6 space-y-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
              Error
            </p>
            <CardTitle className="text-primary">Failed to Load</CardTitle>
            <CardDescription>Could not fetch admin statistics.</CardDescription>
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
    },
    {
      title: "Total Properties",
      value: stats?.totalProperties || 0,
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Views",
      value: stats?.totalViews?.toLocaleString() || 0,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Likes",
      value: stats?.totalLikes || 0,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-secondary mb-2">
            Admin Panel
          </p>
          <h1 className="text-2xl font-semibold text-primary">
            Dashboard
          </h1>
          <p className="text-sm text-secondary-foreground font-light">
            Overview of your real estate platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader className="mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
              Quick Actions
            </p>
            <CardTitle>Manage Platform</CardTitle>
            <CardDescription>Access admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-12">
                <Link to="/admin/users">Manage Users</Link>
              </Button>
              <Button asChild variant="outline" className="h-12">
                <Link to="/admin/properties">Manage Properties</Link>
              </Button>
              <Button asChild variant="outline" className="h-12">
                <Link to="/admin/trending">View Trending</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trending Properties Preview */}
        {stats?.trendingProperties && stats.trendingProperties.length > 0 && (
          <Card>
            <CardHeader className="mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
                  Top Performers
                </p>
              </div>
              <CardTitle>Trending Properties</CardTitle>
              <CardDescription>Top 5 properties by likes and views</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {stats.trendingProperties.length} properties trending
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
