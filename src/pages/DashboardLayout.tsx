import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Heart } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-6 bg-card">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            <Outlet />
          </main>
          <footer className="border-t border-border px-6 py-3 bg-card">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
              <span>by</span>
              <span className="font-semibold text-foreground">Rishi</span>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
