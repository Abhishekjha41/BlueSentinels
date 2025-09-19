import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Layers, Activity } from "lucide-react";

interface MapIncident {
  id: string;
  type: string;
  severity: "low" | "moderate" | "high" | "critical";
  location: {
    name: string;
    coordinates: [number, number];
  };
  description: string;
  verified: boolean;
}

interface InteractiveMapProps {
  incidents?: MapIncident[];
  onIncidentSelect?: (incident: MapIncident) => void;
}

const mockIncidents: MapIncident[] = [
  {
    id: "1",
    type: "high-waves",
    severity: "high", 
    location: { name: "Kerala", coordinates: [76.2711, 10.8505] },
    description: "Dangerous wave conditions detected",
    verified: true
  },
  {
    id: "2",
    type: "flooding",
    severity: "moderate",
    location: { name: "Goa", coordinates: [73.8278, 15.4989] },
    description: "Coastal flooding reported",
    verified: false
  }
];

const severityColors = {
  low: "bg-ocean-200 text-ocean-800",
  moderate: "bg-yellow-200 text-yellow-800",
  high: "bg-coral-200 text-coral-800",
  critical: "bg-red-200 text-red-800"
};

export const InteractiveMap = ({ incidents = mockIncidents, onIncidentSelect }: InteractiveMapProps) => {
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Coastal Incident Map
        </h3>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={showHotspots ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowHotspots(!showHotspots)}
          >
            <Activity className="h-4 w-4 mr-2" />
            Hotspots
          </Button>

          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            {/* Static Map Image */}
            <img 
              src="/src/assets/map.jpg" 
              alt="Ocean monitoring map"
              className="w-full h-full object-cover"
            />
            
            {/* Incident Markers */}
            {incidents.map((incident) => (
              <button
                key={incident.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-200
                  ${selectedIncident?.id === incident.id ? 'scale-110' : 'hover:scale-110'}`}
                style={{
                  left: `${((incident.location.coordinates[0] + 180) / 360) * 100}%`,
                  top: `${((90 - incident.location.coordinates[1]) / 180) * 100}%`
                }}
                onClick={() => {
                  setSelectedIncident(incident);
                  onIncidentSelect?.(incident);
                }}
              >
                <div 
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-lg
                    ${incident.severity === 'critical' ? 'bg-red-500' :
                      incident.severity === 'high' ? 'bg-coral-500' :
                      incident.severity === 'moderate' ? 'bg-yellow-500' :
                      'bg-ocean-500'}`}
                />
                
                {/* Tooltip */}
                <div className="absolute invisible group-hover:visible z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-left">
                    <h4 className="font-semibold text-sm capitalize mb-1">
                      {incident.type.replace('-', ' ')}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {incident.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {incident.severity.toUpperCase()}
                      </Badge>
                      {incident.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Hotspots */}
            {showHotspots && incidents.map((incident, index) => (
              <div
                key={`hotspot-${index}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${((incident.location.coordinates[0] + 180) / 360) * 100}%`,
                  top: `${((90 - incident.location.coordinates[1]) / 180) * 100}%`
                }}
              >
                <div 
                  className={`w-16 h-16 rounded-full opacity-20 animate-pulse
                    ${incident.severity === 'critical' ? 'bg-red-500' :
                      incident.severity === 'high' ? 'bg-coral-500' :
                      incident.severity === 'moderate' ? 'bg-yellow-500' :
                      'bg-ocean-500'}`}
                  style={{
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};