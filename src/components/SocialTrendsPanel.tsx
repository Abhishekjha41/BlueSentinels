import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockKeywords = [
  { term: "high waves", count: 42, sentiment: "negative" },
  { term: "flooding", count: 37, sentiment: "negative" },
  { term: "king tide", count: 18, sentiment: "neutral" },
  { term: "evacuation", count: 9, sentiment: "negative" },
  { term: "coastal damage", count: 12, sentiment: "negative" },
  { term: "safe", count: 15, sentiment: "positive" },
];

const sentimentColor: Record<string, string> = {
  positive: "bg-green-500",
  neutral: "bg-yellow-500",
  negative: "bg-red-500",
};

export const SocialTrendsPanel = () => {
  const max = Math.max(...mockKeywords.map(k => k.count));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Social Trends (NLP)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {mockKeywords.map(k => (
            <div key={k.term} className="w-full">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="truncate">#{k.term}</span>
                <span className="text-muted-foreground">{k.count}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded">
                <div
                  className={`h-2 rounded ${sentimentColor[k.sentiment]}`}
                  style={{ width: `${Math.max(12, Math.round((k.count / max) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">Neg</Badge>
          <span>Likely hazard mentions detected via keywords + sentiment</span>
        </div>
      </CardContent>
    </Card>
  );
};


