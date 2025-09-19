import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, CheckCircle, Activity } from "lucide-react";
import { SocialTrendsPanel } from "./SocialTrendsPanel";
import { InteractiveMap } from './InteractiveMap_simple';

export const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    activeIncidents: 8,
    highPriority: 3,
    verifiedReports: 5,
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Ocean Watch Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor coastal incidents and social media trends in real-time
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Incidents</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeIncidents}</p>
              </div>
              <div className="p-2 bg-warning/10 rounded-full">
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">{stats.highPriority}</p>
                <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
              </div>
              <div className="p-2 bg-destructive/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Reports</p>
                <p className="text-2xl font-bold text-success">{stats.verifiedReports}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
              </div>
              <div className="p-2 bg-success/10 rounded-full">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Status</p>
                <p className="text-2xl font-bold text-primary">Online</p>
                <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="xl:col-span-2">
          <InteractiveMap />
        </div>
        
        {/* Social Trends Section */}
        <div className="xl:col-span-1">
          <SocialTrendsPanel />
        </div>
      </div>
    </div>
  );
};