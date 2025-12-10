import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown } from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const roles: UserRole[] = ['FieldTeam', 'Responder', 'Manager', 'Executive'];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast({ title: 'Please select a role', variant: 'destructive' });
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch (error) {
      toast({ title: 'Login failed', description: 'Please check your credentials', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-2xl p-8">
        {/* Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Security Operations</h1>
          <p className="text-muted-foreground mt-1">Sign in to access the dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@security.com"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              >
                <span className={role ? 'text-foreground' : 'text-muted-foreground'}>
                  {role || 'Select your role'}
                </span>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
              
              {isRoleOpen && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRole(r);
                        setIsRoleOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-muted text-foreground transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-foreground font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
