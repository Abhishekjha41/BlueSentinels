import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Menu,
  Waves
} from "lucide-react";

interface HeaderProps {
  currentView: "citizen" | "official";
  onViewChange: (view: "citizen" | "official") => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-ocean-gradient rounded-lg">
            <Waves className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">OceanWatch</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Coastal Hazard Monitor
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button
            variant={currentView === "citizen" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("citizen")}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Citizen Portal
          </Button>
          
          <Button
            variant={currentView === "official" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("official")}
            className="gap-2"
          >
            <Shield className="h-4 w-4" />
            Emergency Officials
          </Button>
        </nav>

        {/* Status Indicators */}
        <div className="hidden lg:flex items-center space-x-3">
          <Badge variant="outline" className="status-low">
            <div className="w-2 h-2 bg-success rounded-full mr-2" />
            System Active
          </Badge>
          
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              24/7 Monitoring
            </div>
            <div className="text-xs text-muted-foreground">
              Live Updates
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border/50 px-4 py-4 space-y-3">
          <Button
            variant={currentView === "citizen" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              onViewChange("citizen");
              setMobileMenuOpen(false);
            }}
            className="w-full justify-start gap-2"
          >
            <Users className="h-4 w-4" />
            Citizen Portal
          </Button>
          
          <Button
            variant={currentView === "official" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              onViewChange("official");
              setMobileMenuOpen(false);
            }}
            className="w-full justify-start gap-2"
          >
            <Shield className="h-4 w-4" />
            Emergency Officials
          </Button>
        </div>
      )}
    </header>
  );
};