import { LayoutDashboard, Users, ShoppingCart, CreditCard, HeadphonesIcon, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['agent', 'manager', 'admin'] },
  { title: 'Merchant Onboarding', url: '/merchants', icon: Users, roles: ['agent', 'manager', 'admin'] },
  { title: 'Order Tracking', url: '/orders', icon: ShoppingCart, roles: ['agent', 'manager', 'admin'] },
  { title: 'Payment Reconciliation', url: '/payments', icon: CreditCard, roles: ['manager', 'admin'] },
  { title: 'Support Tickets', url: '/tickets', icon: HeadphonesIcon, roles: ['agent', 'manager', 'admin'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();

  const filteredItems = navigationItems.filter((item) => user && item.roles.includes(user.role));
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">OC</span>
          </div>
          {!collapsed && <span className="font-semibold text-sidebar-foreground">Operations Center</span>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {user && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <Button 
                onClick={logout} 
                variant="secondary" 
                size="sm" 
                className="w-full bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground font-medium border border-sidebar-border"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
            {collapsed && (
              <Button 
                onClick={logout} 
                variant="ghost" 
                size="sm" 
                className="w-full h-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
