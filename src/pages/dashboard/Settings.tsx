import { useAuth } from '@/context/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your preferences</p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
          <p className="text-sm text-muted-foreground">Your account details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Username</p>
            <p className="text-foreground">{user?.username || user?.email || 'N/A'}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="text-foreground">{user?.email || 'N/A'}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Role</p>
            <p className="text-foreground">{user?.role || 'Operator'}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Location</p>
            <p className="text-foreground">{user?.location || 'null'}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <p className="text-foreground">{user?.phone || 'null'}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">OTP Enabled</p>
            <p className="text-foreground">{user?.otpEnabled ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">Configure your notification preferences</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-input bg-background text-foreground hover:bg-muted transition-colors text-sm">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-foreground">SMS Alerts</p>
              <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-input bg-background text-foreground hover:bg-muted transition-colors text-sm">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
