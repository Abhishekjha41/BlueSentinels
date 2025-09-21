import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Install: npm install recharts

const incidentsOverTime = [
  { date: "2025-09-14", incidents: 4 },
  { date: "2025-09-15", incidents: 6 },
  { date: "2025-09-16", incidents: 5 },
  { date: "2025-09-17", incidents: 7 },
  { date: "2025-09-18", incidents: 9 },
  { date: "2025-09-19", incidents: 8 },
  { date: "2025-09-20", incidents: 10 },
];

const severityDistribution = [
  { name: "Low", value: 12 },
  { name: "Moderate", value: 22 },
  { name: "High", value: 9 },
  { name: "Critical", value: 3 },
];

const hotspotCounts = [
  { location: "Puri, Odisha", count: 5 },
  { location: "Kanyakumari, TN", count: 4 },
  { location: "Chennai, TN", count: 3 },
  { location: "Goa", count: 2 },
  { location: "Mumbai, MH", count: 1 },
];

const COLORS = ["#2b8cbe", "#f6c85f", "#f5853f", "#d9534f"];

export default function AnalystPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow">
          <CardHeader>
            <CardTitle>Incidents last 7 days</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentsOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle>Severity distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="80%" height="80%">
              <PieChart>
                <Pie data={severityDistribution} dataKey="value" nameKey="name" outerRadius={80} innerRadius={36}>
                  {severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle>Top hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {hotspotCounts.map((h) => (
                <li key={h.location} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{h.location}</div>
                    <div className="text-xs text-muted-foreground">Recent incidents</div>
                  </div>
                  <Badge>{h.count}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow">
          <CardHeader>
            <CardTitle>Incidents by type</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ type: "high-waves", count: 12 }, { type: "flooding", count: 8 }, { type: "oil-slick", count: 3 }, { type: "erosion", count: 5 }]}> 
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow">
          <CardHeader>
            <CardTitle>Trend summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <div>Week-over-week incidents</div>
                <div className="font-medium text-destructive">+15%</div>
              </div>

              <div className="flex justify-between">
                <div>Verified vs Unverified ratio</div>
                <div className="font-medium">60% verified</div>
              </div>

              <div className="flex justify-between">
                <div>Avg response time</div>
                <div className="font-medium">32 mins</div>
              </div>

              <div className="pt-3">
                <button className="px-3 py-2 border rounded text-sm">Export CSV</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
