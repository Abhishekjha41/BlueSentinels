import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Menu,
  Waves,
  LogOut
} from "lucide-react";
import logo from "@/assets/oceanwatch-logo.png"; // TODO: Replace logo file if needed
import { useI18n } from "@/contexts/i18n";

interface HeaderProps {
  currentView: "citizen" | "official";
  onViewChange: (view: "citizen" | "official") => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useI18n();

  const handleLogout = () => {
  localStorage.removeItem("bluesentinels_auth");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-ocean-gradient rounded-lg">
            <img src={logo} alt="BlueSentinels" className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">BlueSentinels</h1>
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
            {t("citizen_portal")}
          </Button>
          
          <Button
            variant={currentView === "official" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("official")}
            className="gap-2"
          >
            <Shield className="h-4 w-4" />
            {t("official_portal")}
          </Button>
        </nav>

        {/* Status + Language */}
        <div className="hidden lg:flex items-center space-x-4">
          <Badge variant="outline" className="status-low">
            <div className="w-2 h-2 bg-success rounded-full mr-2" />
            {t("system_active")}
          </Badge>
          
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {t("monitoring_247")}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("live_updates")}
            </div>
          </div>
          
          <select
            className="text-sm border border-border rounded-md bg-transparent px-2 py-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            aria-label="Select language"
          >
            <option value="en">EN</option>
            <option value="hi">हिं</option>
            <option value="ta">தமி</option>
            <option value="bn">বা</option>
            <option value="te">తెలు</option>
          </select>
          
          <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </Button>
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
            {t("citizen_portal")}
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
            {t("official_portal")}
          </Button>
        </div>
      )}
    </header>
  );
};