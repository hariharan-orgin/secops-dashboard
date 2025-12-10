import { MapPin } from 'lucide-react';

export default function SecurityMap() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Security Map</h1>
        <p className="text-muted-foreground mt-1">Real-time incident tracking</p>
      </div>

      <div className="flex gap-6">
        {/* Map Container */}
        <div className="flex-1 bg-card rounded-lg border border-border min-h-[500px] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">Google Maps Integration</h3>
            <p className="text-muted-foreground mt-1">Map view with incident markers</p>
          </div>
        </div>

        {/* Active Incidents Panel */}
        <div className="w-72 bg-card rounded-lg border border-border p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Active Incidents</h2>
            <p className="text-sm text-muted-foreground">0 active</p>
          </div>
          
          <div className="text-center py-8">
            <p className="text-muted-foreground">No active incidents</p>
          </div>
        </div>
      </div>
    </div>
  );
}
