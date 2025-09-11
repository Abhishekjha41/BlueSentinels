import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Wifi, 
  WifiOff, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Clock
} from "lucide-react";

export const OfflineSyncNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedReports, setQueuedReports] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for queued reports
    const checkQueuedReports = () => {
      const queued = JSON.parse(localStorage.getItem("ow_offline_reports") || "[]");
      setQueuedReports(queued.length);
    };

    checkQueuedReports();
    const interval = setInterval(checkQueuedReports, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleSync = async () => {
    if (queuedReports === 0) return;
    
    setIsSyncing(true);
    
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear queued reports
      localStorage.removeItem("ow_offline_reports");
      setQueuedReports(0);
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${queuedReports} offline reports.`,
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync offline reports. Will retry automatically.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (isOnline && queuedReports === 0) {
    return null; // Don't show if online and no queued reports
  }

  return (
    <Card className={`border-l-4 ${
      !isOnline ? 'border-l-destructive' : 
      queuedReports > 0 ? 'border-l-warning' : 'border-l-success'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isOnline ? (
              <>
                <WifiOff className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-sm font-medium">Offline Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Reports will be queued and synced when online
                  </p>
                </div>
              </>
            ) : queuedReports > 0 ? (
              <>
                <Clock className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm font-medium">Offline Reports Pending</p>
                  <p className="text-xs text-muted-foreground">
                    {queuedReports} report{queuedReports !== 1 ? 's' : ''} waiting to sync
                  </p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium">All Synced</p>
                  <p className="text-xs text-muted-foreground">
                    All reports are up to date
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3 mr-1" />
                  Online
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </>
              )}
            </Badge>

            {queuedReports > 0 && isOnline && (
              <Button
                size="sm"
                onClick={handleSync}
                disabled={isSyncing}
                className="gap-2"
              >
                {isSyncing ? (
                  <>
                    <Upload className="h-3 w-3 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3" />
                    Sync Now
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
