import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, MessageCircle, BarChart2, TrendingUp } from "lucide-react";

interface SocialTrend {
  id: string;
  platform: "twitter" | "facebook" | "instagram";
  content: string;
  author: string;
  engagement: number;
  sentiment: "positive" | "neutral" | "negative";
  timestamp: string;
  hashtags: string[];
  location?: string;
  relevance: number;
}

const mockTrends: SocialTrend[] = [
  {
    id: "1",
    platform: "twitter",
    content: "Huge waves spotted at Goa beach! Stay safe everyone 🌊 #GoaAlert #OceanSafety",
    author: "@beachwatch",
    engagement: 1200,
    sentiment: "negative",
    timestamp: "2024-09-12T10:30:00Z",
    hashtags: ["GoaAlert", "OceanSafety"],
    location: "Goa, India",
    relevance: 0.95
  },
  {
    id: "2",
    platform: "twitter",
    content: "Beautiful morning at Kerala beach. Water quality looks much better after recent cleanup efforts! 🏖️ #CleanOcean",
    author: "@oceanGuardian",
    engagement: 850,
    sentiment: "positive",
    timestamp: "2024-09-12T09:15:00Z",
    hashtags: ["CleanOcean"],
    location: "Kerala, India",
    relevance: 0.82
  },
  {
    id: "3",
    platform: "twitter",
    content: "Unusual tide patterns observed near Mumbai coast. Fishermen advised to be cautious. #MumbaiCoast",
    author: "@coastalWatch",
    engagement: 2100,
    sentiment: "neutral",
    timestamp: "2024-09-12T08:45:00Z",
    hashtags: ["MumbaiCoast"],
    location: "Mumbai, India",
    relevance: 0.88
  }
];

const sentimentColor: Record<string, string> = {
  positive: "bg-green-500",
  neutral: "bg-yellow-500",
  negative: "bg-red-500",
};

export const SocialTrendsPanel = () => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60)),
      'hours'
    );
  };

  const getSentimentColor = (sentiment: SocialTrend["sentiment"]) => {
    return {
      positive: "bg-ocean-100 text-ocean-700",
      neutral: "bg-gray-100 text-gray-700",
      negative: "bg-coral-100 text-coral-700"
    }[sentiment];
  };

  const getEngagementLevel = (engagement: number) => {
    if (engagement > 1500) return "High";
    if (engagement > 500) return "Medium";
    return "Low";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-ocean-600" />
            Social Media Trends
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            Live Updates
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTrends.map((trend) => (
          <div
            key={trend.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-medium">{trend.author}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {formatTime(trend.timestamp)}
              </Badge>
            </div>
            
            <p className="text-sm mb-3">{trend.content}</p>
            
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {trend.hashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-ocean-50 text-ocean-600 hover:bg-ocean-100"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {trend.engagement} engagements
              </div>
              <div className="flex items-center gap-1">
                <BarChart2 className="h-3 w-3" />
                {getEngagementLevel(trend.engagement)}
              </div>
              <Badge className={`text-xs ${getSentimentColor(trend.sentiment)}`}>
                {trend.sentiment.charAt(0).toUpperCase() + trend.sentiment.slice(1)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};


