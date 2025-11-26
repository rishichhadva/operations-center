import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Shield, User, Crown, Heart } from 'lucide-react';

const roles: { role: UserRole; title: string; description: string; icon: typeof User }[] = [
  {
    role: 'agent',
    title: 'Operations Agent',
    description: 'Handle day-to-day operations, tickets, and merchant support',
    icon: User,
  },
  {
    role: 'manager',
    title: 'Operations Manager',
    description: 'Review merchants, reconcile payments, manage team',
    icon: Shield,
  },
  {
    role: 'admin',
    title: 'Admin',
    description: 'Full access to all operations and settings',
    icon: Crown,
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-4xl p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary mb-4">
            <span className="text-primary-foreground font-bold text-2xl">OC</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Operations Center</h1>
          <p className="text-muted-foreground">E-Commerce Operations Management Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Role</CardTitle>
            <CardDescription>Choose a role to access the portal (demo mode)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {roles.map(({ role, title, description, icon: Icon }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-lg border-2 text-left transition-all hover:border-primary ${
                    selectedRole === role ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <Icon className="h-8 w-8 mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </button>
              ))}
            </div>
            <Button onClick={handleLogin} disabled={!selectedRole} className="w-full" size="lg">
              Continue to Portal
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          This is a demo portal with mock data. No real authentication required.
        </p>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-4">
          <span>Made with</span>
          <Heart className="h-3 w-3 fill-red-500 text-red-500" />
          <span>by</span>
          <span className="font-semibold text-foreground">Rishi</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
