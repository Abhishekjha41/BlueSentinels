import { Card } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { SocialTrendsPanel } from "./SocialTrendsPanel";
import { InteractiveMap } from './InteractiveMap_enhanced';

export const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Ocean Watch Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor coastal incidents and social media trends in real-time
        </p>
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

export default Dashboard;