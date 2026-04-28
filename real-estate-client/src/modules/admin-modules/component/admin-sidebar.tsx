import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Calendar, 
  LogOut,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
  },
  {
    title: 'User Management',
    icon: Users,
    path: '/admin/users',
    subItems: [
      { title: 'All Users', path: '/admin/users/list' },
      { title: 'User Stats', path: '/admin/users/stats' },
    ]
  },
  {
    title: 'Property Management',
    icon: Home,
    path: '/admin/properties',
    subItems: [
      { title: 'All Properties', path: '/admin/properties/list' },
      { title: 'Property Stats', path: '/admin/properties/stats' },
    ]
  },
  {
    title: 'Scheduling',
    icon: Calendar,
    path: '/admin/scheduling',
    subItems: [
      { title: 'All Requests', path: '/admin/scheduling/list' },
      { title: 'Scheduling Stats', path: '/admin/scheduling/stats' },
    ]
  },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Admin Panel
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <div key={item.title} className="space-y-1">
              <Link
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </div>
                {item.subItems && (
                  <ChevronRight className={cn("w-4 h-4 transition-transform", isActive && "rotate-90")} />
                )}
              </Link>
              
              {item.subItems && isActive && (
                <div className="pl-9 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.path}
                      className={cn(
                        "block px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        location.pathname === subItem.path
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-secondary-foreground hover:bg-secondary"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};
