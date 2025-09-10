import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  TrendingUp,
  Users,
  Camera,
  Filter,
  RefreshCw
} from "lucide-react";

interface Incident {
  id: string;
  type: "tsunami" | "flooding" | "high-waves" | "unusual-tides" | "coastal-damage";
  severity: "low" | "moderate" | "high" | "critical";
  location: {
    name: string;
    coordinates: [number, number];
  };
  description: string;
  reporter: string;
  timestamp: string;
  hasMedia: boolean;
  verified: boolean;
}

interface DashboardProps {
  userRole: "citizen" | "official";
}

// Mock data for demonstration
const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "high-waves",
    severity: "high",
    location: { name: "Santa Monica Beach, CA", coordinates: [-118.4912, 34.0195] },
    description: "Waves reaching 12+ feet, dangerous conditions for swimmers",
    reporter: "Beach Safety Officer",
    timestamp: "2024-09-10T14:30:00Z",
    hasMedia: true,
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
    hasMedia: true,
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
    hasMedia: false,
    verified: true
  }
];

const severityConfig = {
  low: { label: "Low", className: "status-low", icon: "🟢" },
  moderate: { label: "Moderate", className: "status-moderate", icon: "🟡" },
  high: { label: "High", className: "status-high", icon: "🟠" },
  critical: { label: "Critical", className: "status-critical", icon: "🔴" }
};

const typeConfig = {
  "tsunami": { label: "Tsunami Warning", icon: "🌊" },
  "flooding": { label: "Coastal Flooding", icon: "💧" },
  "high-waves": { label: "High Waves", icon: "🌊" },
  "unusual-tides": { label: "Unusual Tides", icon: "🌙" },
  "coastal-damage": { label: "Coastal Damage", icon: "⚠️" }
};

export const Dashboard = ({ userRole }: DashboardProps) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredIncidents = mockIncidents.filter(incident => {
    const severityMatch = selectedSeverity === "all" || incident.severity === selectedSeverity;
    const typeMatch = selectedType === "all" || incident.type === selectedType;
    return severityMatch && typeMatch;
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Incidents</p>
                <p className="text-2xl font-bold text-foreground">{mockIncidents.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">
                  {mockIncidents.filter(i => i.severity === "high" || i.severity === "critical").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reports Today</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Reports</p>
                <p className="text-2xl font-bold text-success">
                  {mockIncidents.filter(i => i.verified).length}
                </p>
              </div>
              <Camera className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSeverity === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSeverity("all")}
          >
            All Severity
          </Button>
          {Object.entries(severityConfig).map(([key, config]) => (
            <Button
              key={key}
              variant={selectedSeverity === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity(key)}
              className={selectedSeverity === key ? config.className : ""}
            >
              {config.icon} {config.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Incident List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Recent Incidents ({filteredIncidents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <div className="text-2xl">{typeConfig[incident.type].icon}</div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium text-foreground">
                      {typeConfig[incident.type].label}
                    </h3>
                    <Badge className={severityConfig[incident.severity].className}>
                      {severityConfig[incident.severity].label}
                    </Badge>
                    {incident.verified && userRole === "official" && (
                      <Badge variant="outline" className="status-low">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {incident.location.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(incident.timestamp)}
                    </span>
                    <span>Reporter: {incident.reporter}</span>
                    {incident.hasMedia && (
                      <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Media attached
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};