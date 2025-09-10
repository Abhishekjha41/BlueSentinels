import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Camera,
  Clock,
  User
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
}

interface InteractiveMapProps {
  incidents?: MapIncident[];
  onIncidentSelect?: (incident: MapIncident) => void;
}

// Mock incidents with geographic distribution
const mockIncidents: MapIncident[] = [
  {
    id: "1",
    type: "high-waves",
    severity: "high", 
    location: { name: "Santa Monica Beach, CA", coordinates: [-118.4912, 34.0195] },
    description: "Waves reaching 12+ feet, dangerous conditions for swimmers",
    reporter: "Beach Safety Officer",
    timestamp: "2024-09-10T14:30:00Z",
    verified: true
  },
  {
    id: "2",
    type: "flooding",
    severity: "moderate",
    location: { name: "Miami Beach, FL", coordinates: [-80.1300, 25.7907] },
    description: "Street flooding on Ocean Drive due to king tide",
    reporter: "Citizen Report",
    timestamp: "2024-09-10T13:15:00Z", 
    verified: false
  },
  {
    id: "3", 
    type: "unusual-tides",
    severity: "low",
    location: { name: "Monterey Bay, CA", coordinates: [-121.9018, 36.6002] },
    description: "Unusually low tide exposing sea floor areas",
    reporter: "Marine Biologist",
    timestamp: "2024-09-10T12:00:00Z",
    verified: true
  },
  {
    id: "4",
    type: "coastal-damage", 
    severity: "high",
    location: { name: "Virginia Beach, VA", coordinates: [-75.9780, 36.8529] },
    description: "Significant erosion damage to boardwalk structures",
    reporter: "City Inspector",
    timestamp: "2024-09-10T11:45:00Z",
    verified: true
  },
  {
    id: "5",
    type: "tsunami",
    severity: "critical",
    location: { name: "Hilo Bay, HI", coordinates: [-155.0890, 19.7297] },
    description: "Tsunami warning issued - water receding rapidly",
    reporter: "Pacific Tsunami Warning Center",
    timestamp: "2024-09-10T10:20:00Z",
    verified: true
  }
];

const severityColors = {
  low: "#22c55e",     // Green
  moderate: "#f59e0b", // Yellow
  high: "#ef4444",     // Red  
  critical: "#dc2626"  // Dark Red
};

const severityLabels = {
  low: "Low Risk",
  moderate: "Moderate Risk", 
  high: "High Risk",
  critical: "Critical Risk"
};

export const InteractiveMap = ({ incidents = mockIncidents, onIncidentSelect }: InteractiveMapProps) => {
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(null);
  const [mapView, setMapView] = useState({ zoom: 4, center: [-98.5795, 39.8282] }); // Center of US

  const handleIncidentClick = (incident: MapIncident) => {
    setSelectedIncident(incident);
    onIncidentSelect?.(incident);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Calculate map bounds and hotspots
  const getIncidentsByRegion = () => {
    const regions = {
      "West Coast": incidents.filter(i => i.location.coordinates[0] < -100),
      "East Coast": incidents.filter(i => i.location.coordinates[0] > -100 && i.location.coordinates[0] > -85),
      "Gulf Coast": incidents.filter(i => i.location.coordinates[0] > -100 && i.location.coordinates[0] < -85),
      "Pacific Islands": incidents.filter(i => i.location.coordinates[0] < -140)
    };
    return regions;
  };

  const regions = getIncidentsByRegion();

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Incident Map
        </h3>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Display */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg overflow-hidden">
                {/* Simulated map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-green-200/50 dark:from-blue-800/50 dark:to-green-800/50" />
                
                {/* Incident Markers */}
                {incidents.map((incident) => {
                  // Convert coordinates to pixel positions (simplified)
                  const x = ((incident.location.coordinates[0] + 180) / 360) * 100;
                  const y = ((90 - incident.location.coordinates[1]) / 180) * 100;
                  
                  return (
                    <div
                      key={incident.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => handleIncidentClick(incident)}
                    >
                      {/* Incident Marker */}
                      <div 
                        className={`w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse ${
                          selectedIncident?.id === incident.id ? 'scale-150' : ''
                        }`}
                        style={{ backgroundColor: severityColors[incident.severity] }}
                      />
                      
                      {/* Severity Ring */}
                      <div 
                        className="absolute inset-0 rounded-full border opacity-30 animate-ping"
                        style={{ borderColor: severityColors[incident.severity] }}
                      />
                      
                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {incident.location.name}
                        <br />
                        {severityLabels[incident.severity]}
                      </div>
                    </div>
                  );
                })}
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                  <h4 className="font-semibold mb-2">Severity Legend</h4>
                  {Object.entries(severityLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: severityColors[key as keyof typeof severityColors] }}
                      />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                
                {/* Map Attribution */}
                <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                  Ocean Hazard Monitoring Platform
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Details Sidebar */}
        <div className="space-y-4">
          {/* Regional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Regional Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(regions).map(([region, regionIncidents]) => (
                <div key={region} className="flex items-center justify-between">
                  <span className="text-sm">{region}</span>
                  <Badge variant={regionIncidents.length > 2 ? "destructive" : "outline"}>
                    {regionIncidents.length} incidents
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Incident Details */}
          {selectedIncident ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: severityColors[selectedIncident.severity] }}
                  />
                  Incident Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Badge className={`status-${selectedIncident.severity}`}>
                    {severityLabels[selectedIncident.severity]}
                  </Badge>
                  {selectedIncident.verified && (
                    <Badge variant="outline" className="ml-2 status-low">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">{selectedIncident.location.name}</h4>
                  <p className="text-xs text-muted-foreground">{selectedIncident.description}</p>
                </div>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Reported by: {selectedIncident.reporter}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(selectedIncident.timestamp)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedIncident.location.coordinates.join(', ')}
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  View Media & Details
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Click on a map marker to view incident details</p>
              </CardContent>
            </Card>
          )}

          {/* Live Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Live Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Active:</span>
                <span className="font-medium">{incidents.length}</span>
              </div>
              <div className="flex justify-between">
                <span>High Priority:</span>
                <span className="font-medium text-destructive">
                  {incidents.filter(i => i.severity === "high" || i.severity === "critical").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Verified:</span>
                <span className="font-medium text-success">
                  {incidents.filter(i => i.verified).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};