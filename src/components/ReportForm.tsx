import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Camera, 
  MapPin, 
  Upload, 
  Send, 
  AlertTriangle,
  Clock,
  User
} from "lucide-react";

interface ReportFormProps {
  onSubmit?: (data: any) => void;
}

const hazardTypes = [
  { value: "tsunami", label: "Tsunami Warning", icon: "🌊" },
  { value: "flooding", label: "Coastal Flooding", icon: "💧" },
  { value: "high-waves", label: "High Waves", icon: "🌊" },
  { value: "unusual-tides", label: "Unusual Tides", icon: "🌙" },
  { value: "coastal-damage", label: "Coastal Damage", icon: "⚠️" },
  { value: "other", label: "Other Hazard", icon: "❓" }
];

const severityLevels = [
  { value: "low", label: "Low Risk", description: "Minor observation, no immediate danger" },
  { value: "moderate", label: "Moderate Risk", description: "Noticeable conditions, exercise caution" },
  { value: "high", label: "High Risk", description: "Dangerous conditions, avoid area" },
  { value: "critical", label: "Critical Risk", description: "Immediate danger, evacuate if necessary" }
];

export const ReportForm = ({ onSubmit }: ReportFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    hazardType: "",
    severity: "",
    location: "",
    description: "",
    reporterName: "",
    reporterContact: "",
    hasMedia: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationCapture = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);
          setFormData(prev => ({
            ...prev,
            location: `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`
          }));
          
          toast({
            title: "Location Captured",
            description: "Your current location has been recorded",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const reportData = {
      ...formData,
      coordinates: location,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    };

    // Offline-first queue using localStorage
    try {
      // Simulate network presence
      const isOnline = navigator.onLine;
      if (!isOnline) {
        const existing = JSON.parse(localStorage.getItem("ow_offline_reports") || "[]");
        existing.push({ ...reportData, mediaNames: mediaFiles.map(f => f.name), status: "queued" });
        localStorage.setItem("ow_offline_reports", JSON.stringify(existing));
        toast({
          title: "Saved Offline",
          description: "No internet detected. Your report is queued and will auto-sync.",
        });
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        onSubmit?.(reportData);
        toast({
          title: "Report Submitted",
          description: "Your hazard report has been submitted successfully and will be reviewed by emergency officials.",
        });
      }
    } catch (err) {
      const existing = JSON.parse(localStorage.getItem("ow_offline_reports") || "[]");
      existing.push({ ...reportData, mediaNames: mediaFiles.map(f => f.name), status: "queued" });
      localStorage.setItem("ow_offline_reports", JSON.stringify(existing));
      toast({
        title: "Saved Offline",
        description: "We hit a network error. Your report will sync when online.",
      });
    }
    
    // Reset form
    setFormData({
      hazardType: "",
      severity: "",
      location: "",
      description: "",
      reporterName: "",
      reporterContact: "",
      hasMedia: false
    });
    setLocation(null);
    setMediaFiles([]);
    setIsSubmitting(false);
  };

  const selectedHazard = hazardTypes.find(h => h.value === formData.hazardType);
  const selectedSeverity = severityLevels.find(s => s.value === formData.severity);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Report Ocean Hazard
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help protect your community by reporting ocean and coastal hazards. 
          Your report will be reviewed by emergency officials and help improve public safety.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hazard Type */}
          <div className="space-y-2">
            <Label htmlFor="hazardType">Type of Hazard *</Label>
            <Select 
              value={formData.hazardType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, hazardType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the type of hazard you observed" />
              </SelectTrigger>
              <SelectContent>
                {hazardTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedHazard && (
              <Badge variant="outline" className="mt-2">
                {selectedHazard.icon} {selectedHazard.label}
              </Badge>
            )}
          </div>

          {/* Severity Level */}
          <div className="space-y-3">
            <Label>Severity Level *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {severityLevels.map((level) => (
                <div
                  key={level.value}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    formData.severity === level.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{level.label}</span>
                    <input
                      type="radio"
                      name="severity"
                      value={level.value}
                      checked={formData.severity === level.value}
                      onChange={() => {}}
                      className="text-primary"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter address or coordinates"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleLocationCapture}
                title="Capture current location"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
            {location && (
              <p className="text-xs text-muted-foreground">
                📍 Location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you observed in detail. Include time, conditions, and any immediate dangers..."
              rows={4}
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label>Photo/Video Evidence</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload photos or videos of the hazard (optional but recommended)
              </p>
              <label className="inline-flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setMediaFiles(files);
                    setFormData(prev => ({ ...prev, hasMedia: files.length > 0 }));
                  }}
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </label>
              {mediaFiles.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">{mediaFiles.length} file(s) selected</p>
              )}
            </div>
          </div>

          {/* Reporter Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reporterName">Your Name</Label>
              <Input
                id="reporterName"
                value={formData.reporterName}
                onChange={(e) => setFormData(prev => ({ ...prev, reporterName: e.target.value }))}
                placeholder="Full name (optional for anonymous reports)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reporterContact">Contact Information</Label>
              <Input
                id="reporterContact"
                value={formData.reporterContact}
                onChange={(e) => setFormData(prev => ({ ...prev, reporterContact: e.target.value }))}
                placeholder="Phone or email (optional)"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!formData.hazardType || !formData.severity || !formData.location || !formData.description || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Hazard Report
                </>
              )}
            </Button>
            
            {selectedSeverity && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                This report will be marked as <strong>{selectedSeverity.label}</strong> and 
                {formData.severity === 'critical' ? ' immediately escalated to emergency services' : ' reviewed by officials'}
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};