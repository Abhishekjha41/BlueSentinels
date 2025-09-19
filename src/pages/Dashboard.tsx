import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Dashboard as DashboardComponent } from "@/components/Dashboard_clean";
import { ReportForm } from "@/components/ReportForm";
import { InteractiveMap } from "@/components/InteractiveMap_simple";
import { OfflineSyncNotification } from "@/components/OfflineSyncNotification";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/ocean-monitoring-hero.jpg";
import { 
  BarChart3, 
  FileText, 
  Map, 
  AlertCircle, 
  Users, 
  Shield,
  Waves,
  Smartphone,
  Globe,
  Zap
} from "lucide-react";

type ViewType = "dashboard" | "report" | "map";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<"citizen" | "official">("citizen");
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

  // Check authentication
  useEffect(() => {
  const authData = localStorage.getItem("bluesentinels_auth");
    if (!authData) {
      navigate("/login");
      return;
    }
    
    try {
      const auth = JSON.parse(authData);
      setCurrentRole(auth.role);
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const navigation = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: BarChart3, 
      description: "Overview and statistics",
      roles: ["citizen", "official"] as ("citizen" | "official")[]
    },
    { 
      id: "report", 
      label: "Report Hazard", 
      icon: FileText, 
      description: "Submit new incident report",
      roles: ["citizen"] as ("citizen" | "official")[]
    },
    { 
      id: "map", 
      label: "Live Map", 
      icon: Map, 
      description: "Interactive incident visualization",
      roles: ["citizen", "official"] as ("citizen" | "official")[]
    }
  ];

  const filteredNavigation = navigation.filter(nav => 
    nav.roles.includes(currentRole)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentRole} onViewChange={setCurrentRole} />
      
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Offline Sync Notification */}
        <OfflineSyncNotification />

        {/* Hero Section - Only show on dashboard */}
        {currentView === "dashboard" && (
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-ocean-gradient p-8 text-white" 
                 style={{
                   backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(59, 130, 246, 0.9)), url('${heroImage}')`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundBlendMode: 'overlay'
                 }}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Waves className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      BlueSentinels Platform
                    </h1>
                    <p className="text-white/90">
                      Real-time coastal hazard monitoring and community reporting
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Community Powered</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Citizens and officials working together for coastal safety
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5" />
                      <span className="font-medium">Real-time Alerts</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Instant notifications for emerging ocean hazards
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5" />
                      <span className="font-medium">Global Coverage</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Comprehensive monitoring of coastal regions worldwide
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            </div>
          </div>
        )}

        {/* Role-specific Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentRole === "citizen" ? "Citizen Portal" : "Emergency Operations"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentRole === "citizen" 
                  ? "Report hazards and stay informed about ocean conditions" 
                  : "Monitor incidents and coordinate emergency response"
                }
              </p>
            </div>
            
            <Badge 
              variant="outline" 
              className={currentRole === "citizen" ? "status-low" : "status-moderate"}
            >
              {currentRole === "citizen" ? (
                <>
                  <Users className="h-3 w-3 mr-1" />
                  Citizen Access
                </>
              ) : (
                <>
                  <Shield className="h-3 w-3 mr-1" />
                  Official Access
                </>
              )}
            </Badge>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {filteredNavigation.map((nav) => {
              const IconComponent = nav.icon;
              return (
                <Button
                  key={nav.id}
                  variant={currentView === nav.id ? "default" : "outline"}
                  onClick={() => handleViewChange(nav.id as ViewType)}
                  className="gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {nav.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main>
          {currentView === "dashboard" && (
            <DashboardComponent userRole={currentRole} />
          )}
          
          {currentView === "report" && currentRole === "citizen" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-warning" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Report Ocean Hazard
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your observations help protect coastal communities. Report any unusual ocean conditions,
                  flooding, high waves, or coastal damage you observe.
                </p>
              </div>
              
              <ReportForm onSubmit={(data) => {
                console.log("New report submitted:", data);
                // Here you would typically send to backend
              }} />
            </div>
          )}
          
          {currentView === "map" && (
            <InteractiveMap 
              onIncidentSelect={(incident) => {
                console.log("Incident selected:", incident);
              }}
            />
          )}
        </main>

        {/* Quick Actions Footer */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="group hover:shadow-professional transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-sm mb-1">Mobile App</h3>
                <p className="text-xs text-muted-foreground">
                  Report on-the-go with our mobile application
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-professional transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-warning group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-sm mb-1">Emergency Alerts</h3>
                <p className="text-xs text-muted-foreground">
                  Get notified of critical hazards in your area
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-professional transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-sm mb-1">Analytics</h3>
                <p className="text-xs text-muted-foreground">
                  Historical data and trend analysis
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-professional transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-success group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-sm mb-1">Community</h3>
                <p className="text-xs text-muted-foreground">
                  Connect with other coastal safety advocates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;