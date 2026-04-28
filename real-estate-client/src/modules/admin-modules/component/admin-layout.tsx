import { Outlet } from 'react-router';
import { AdminSidebar } from './admin-sidebar';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
