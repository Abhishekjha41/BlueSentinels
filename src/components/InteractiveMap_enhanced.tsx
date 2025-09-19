import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Layers, 
  Activity,
  Clock,
  User,
  AlertTriangle
} from "lucide-react";

interface MapIncident {
  id: string;
  type: string;
  severity: "low" | "moderate" | "high" | "critical";
  location: {
    name: string;
    coordinates: [number, number];
  };
  description: string;
  reporter: string;
  timestamp: string;
  verified: boolean;
  source: "citizen" | "official" | "social" | "sensor";
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
    description: "Waves reaching 12+ feet, dangerous conditions for swimmers",
    reporter: "Beach Safety Officer",
    timestamp: "2024-09-10T14:30:00Z",
    verified: true,
    source: "official"
  },
  {
    id: "2",
    type: "flooding",
    severity: "moderate",
    location: { name: "Goa", coordinates: [73.8278, 15.4989] },
    description: "Street flooding on Ocean Drive due to king tide",
    reporter: "Citizen Report",
    timestamp: "2024-09-10T13:15:00Z", 
    verified: false,
    source: "citizen"
  },
  {
    id: "3", 
    type: "unusual-tides",
    severity: "low",
    location: { name: "Mumbai", coordinates: [72.8777, 19.0760] },
    description: "Unusually low tide exposing sea floor areas",
    reporter: "Marine Biologist",
    timestamp: "2024-09-10T12:00:00Z",
    verified: true,
    source: "official"
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
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [showHotspots, setShowHotspots] = useState(true);

  const handleIncidentClick = (incident: MapIncident) => {
    setSelectedIncident(incident);
    onIncidentSelect?.(incident);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Filter incidents by source
  const filteredIncidents = incidents.filter(incident => 
    sourceFilter === "all" || incident.source === sourceFilter
  );

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Incident Map
        </h3>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="citizen">Citizen</SelectItem>
              <SelectItem value="official">Official</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="sensor">Sensors</SelectItem>
            </SelectContent>
          </Select>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Display */}
        <div className="lg:col-span-2">
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
                {filteredIncidents.map((incident) => (
                  <button
                    key={incident.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-200
                      ${selectedIncident?.id === incident.id ? 'scale-110' : 'hover:scale-110'}`}
                    style={{
                      left: `${((incident.location.coordinates[0] + 180) / 360) * 100}%`,
                      top: `${((90 - incident.location.coordinates[1]) / 180) * 100}%`
                    }}
                    onClick={() => handleIncidentClick(incident)}
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
                {showHotspots && filteredIncidents.map((incident, index) => (
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

        {/* Incident Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              {selectedIncident ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {selectedIncident.type.replace('-', ' ')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedIncident.location.name}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={severityColors[selectedIncident.severity]}>
                        {selectedIncident.severity.toUpperCase()}
                      </Badge>
                      {selectedIncident.verified && (
                        <Badge variant="outline">Verified</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm">
                      {selectedIncident.description}
                    </p>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatTime(selectedIncident.timestamp)}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {selectedIncident.reporter}
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {selectedIncident.source.charAt(0).toUpperCase() + selectedIncident.source.slice(1)} Report
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Select an incident on the map to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};