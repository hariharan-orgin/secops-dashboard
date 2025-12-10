import { Folder, AlertTriangle, CheckCircle, Mail } from 'lucide-react';

const stats = [
  { label: 'Total Cases', value: 0, icon: Folder, color: 'text-primary' },
  { label: 'Active Alerts', value: 0, icon: AlertTriangle, color: 'text-destructive' },
  { label: 'Resolved', value: 0, icon: CheckCircle, color: 'text-success' },
  { label: 'Inbox', value: 0, icon: Mail, color: 'text-primary' },
];

export default function Overview() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome to the Security Operations Center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-4xl font-bold text-foreground mt-2">{stat.value}</p>
            </div>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        ))}
      </div>

      {/* Recent Incidents */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Security Incidents</h2>
          <p className="text-sm text-muted-foreground">Latest security events and alerts</p>
        </div>
        
        <div className="flex items-center justify-center py-16">
          <p className="text-muted-foreground">No incidents to display</p>
        </div>
      </div>
    </div>
  );
}
