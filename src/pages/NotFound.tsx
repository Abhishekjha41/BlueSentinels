import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-ocean-gradient rounded-full mx-auto mb-6">
            <Waves className="h-8 w-8 text-white" />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <h1 className="text-3xl font-bold text-foreground">404</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved. 
            Return to the OceanWatch dashboard to continue monitoring coastal hazards.
          </p>
          
          <Button 
            onClick={() => window.location.href = "/"}
            className="w-full"
          >
            Return to Dashboard
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            If you believe this is an error, please contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
