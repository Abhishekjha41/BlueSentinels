import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  TrendingUp,
  Users,
  Camera,
  Filter,
  RefreshCw,
  BarChart3,
  Activity,
  Shield,
  Globe,
  Zap,
  TrendingDown,
  CheckCircle,
  XCircle
} from "lucide-react";
import { SocialTrendsPanel } from "./SocialTrendsPanel";

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
  source: "citizen" | "official" | "social" | "sensor";
  responseTime?: number; // minutes
  status: "active" | "investigating" | "resolved" | "false-alarm";
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
    verified: true,
    source: "official",
    responseTime: 5,
    status: "active"
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
    verified: false,
    source: "citizen",
    responseTime: 15,
    status: "investigating"
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
    verified: true,
    source: "official",
    responseTime: 2,
    status: "resolved"
  },
  {
    id: "4",
    type: "tsunami",
    severity: "critical",
    location: { name: "Hilo Bay, HI", coordinates: [-155.0890, 19.7297] },
    description: "Tsunami warning issued - water receding rapidly",
    reporter: "Pacific Tsunami Warning Center",
    timestamp: "2024-09-10T10:20:00Z",
    hasMedia: false,
    verified: true,
    source: "sensor",
    responseTime: 1,
    status: "active"
  },
  {
    id: "5",
    type: "high-waves",
    severity: "moderate",
    location: { name: "Santa Monica Beach, CA", coordinates: [-118.4912, 34.0195] },
    description: "Waves getting bigger, stay away from water",
    reporter: "@beachgoer123",
    timestamp: "2024-09-10T14:15:00Z",
    hasMedia: false,
    verified: false,
    source: "social",
    responseTime: 30,
    status: "investigating"
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
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredIncidents = useMemo(() => {
    return mockIncidents.filter(incident => {
      const severityMatch = selectedSeverity === "all" || incident.severity === selectedSeverity;
      const typeMatch = selectedType === "all" || incident.type === selectedType;
      const sourceMatch = selectedSource === "all" || incident.source === selectedSource;
      const statusMatch = selectedStatus === "all" || incident.status === selectedStatus;
      return severityMatch && typeMatch && sourceMatch && statusMatch;
    });
  }, [selectedSeverity, selectedType, selectedSource, selectedStatus]);

  // Analytics for officials
  const analytics = useMemo(() => {
    const total = mockIncidents.length;
    const highPriority = mockIncidents.filter(i => i.severity === "high" || i.severity === "critical").length;
    const verified = mockIncidents.filter(i => i.verified).length;
    const avgResponseTime = mockIncidents.reduce((sum, i) => sum + (i.responseTime || 0), 0) / total;
    const sourceBreakdown = mockIncidents.reduce((acc, i) => {
      acc[i.source] = (acc[i.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const statusBreakdown = mockIncidents.reduce((acc, i) => {
      acc[i.status] = (acc[i.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      highPriority,
      verified,
      avgResponseTime: Math.round(avgResponseTime),
      sourceBreakdown,
      statusBreakdown
    };
  }, []);

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
                <p className="text-2xl font-bold text-foreground">{analytics.total}</p>
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
                <p className="text-2xl font-bold text-destructive">{analytics.highPriority}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Reports</p>
                <p className="text-2xl font-bold text-success">{analytics.verified}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        {userRole === "official" ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-primary">{analytics.avgResponseTime}m</p>
                </div>
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ) : (
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
        )}
      </div>

      {/* Official Analytics */}
      {userRole === "official" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Source Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(analytics.sourceBreakdown).map(([source, count]) => (
                <div key={source} className="flex items-center justify-between text-sm">
                  <span className="capitalize">{source}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(analytics.statusBreakdown).map(([status, count]) => {
                const statusConfig = {
                  active: { color: "text-destructive", icon: "🔴" },
                  investigating: { color: "text-warning", icon: "🟡" },
                  resolved: { color: "text-success", icon: "🟢" },
                  "false-alarm": { color: "text-muted-foreground", icon: "⚪" }
                };
                const config = statusConfig[status as keyof typeof statusConfig];
                
                return (
                  <div key={status} className="flex items-center justify-between text-sm">
                    <span className="capitalize flex items-center gap-1">
                      <span>{config.icon}</span>
                      {status.replace('-', ' ')}
                    </span>
                    <Badge variant="outline" className={config.color}>{count}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">NLP Processing</span>
                <Badge className="status-low">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Social Monitoring</span>
                <Badge className="status-low">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sensor Network</span>
                <Badge className="status-low">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Alert System</span>
                <Badge className="status-low">Operational</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Filters and Controls */}
      <div className="space-y-4">
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
              Advanced
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Type:</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(typeConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.icon} {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Source:</label>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="citizen">Citizen</SelectItem>
                <SelectItem value="official">Official</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="sensor">Sensor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {userRole === "official" && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="false-alarm">False Alarm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Incident List + Social NLP Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Recent Incidents ({filteredIncidents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
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
                    {userRole === "official" && (
                      <Badge variant="outline" className="text-xs">
                        {incident.source}
                      </Badge>
                    )}
                    {userRole === "official" && incident.responseTime && (
                      <Badge variant="outline" className="text-xs">
                        {incident.responseTime}m response
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
            <div>
              <SocialTrendsPanel />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};