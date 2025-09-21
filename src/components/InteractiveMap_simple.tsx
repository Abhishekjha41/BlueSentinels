import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  ZoomControl,
  LayersControl,
  GeoJSON,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Note: To use this component install dependencies:
// npm install react-leaflet leaflet react-leaflet-markercluster
// and ensure your bundler handles CSS imports.

// Fix default icon paths (Leaflet + CRA/Vite bundling issues)
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type Severity = "low" | "moderate" | "high" | "critical";

interface MapIncident {
  id: string;
  type: string;
  severity: Severity;
  location: {
    name: string;
    coordinates: [number, number]; // [lng, lat]
  };
  description: string;
  verified: boolean;
  reportedAt: string; // ISO date string
}

interface InteractiveMapFullProps {
  incidents?: MapIncident[];
  showSidebar?: boolean;
}

// Mock recent hazards along Indian coastline. These are generated to look recent.
const mockIncidents: MapIncident[] = [
  {
    id: "inc-kanyakumari-01",
    type: "high-waves",
    severity: "high",
    location: { name: "Kanyakumari, Tamil Nadu", coordinates: [77.5385, 8.0883] },
    description: "Unusually high wave heights near the shore. Fishing advisories issued.",
    verified: true,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: "inc-chennai-02",
    type: "coastal-flooding",
    severity: "moderate",
    location: { name: "Chennai, Tamil Nadu", coordinates: [80.2707, 13.0827] },
    description: "Low-lying coastal flooding reported after heavy rains.",
    verified: false,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
  },
  {
    id: "inc-mumbai-03",
    type: "oil-slick",
    severity: "low",
    location: { name: "Mumbai, Maharashtra", coordinates: [72.8777, 19.0760] },
    description: "Small oil slick observed near jetty. Monitoring in progress.",
    verified: true,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "inc-goa-04",
    type: "coastal-erosion",
    severity: "moderate",
    location: { name: "Goa", coordinates: [73.8317, 15.4909] },
    description: "Erosion reported at a popular beach stretch.",
    verified: false,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
  },
  {
    id: "inc-odisha-05",
    type: "fisheries-disturbance",
    severity: "critical",
    location: { name: "Puri, Odisha", coordinates: [85.8312, 19.8135] },
    description: "Large fish kill reported close to shore. Rapid response required.",
    verified: true,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
  },
  {
    id: "inc-kerala-06",
    type: "storm-surge",
    severity: "high",
    location: { name: "Kochi, Kerala", coordinates: [76.2673, 9.9312] },
    description: "Elevated sea level and surge observed during strong winds.",
    verified: false,
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

const severityToColor = (s: Severity) => {
  switch (s) {
    case "low":
      return "#2b8cbe"; // ocean blue
    case "moderate":
      return "#f6c85f"; // yellow
    case "high":
      return "#f5853f"; // orange/coral
    case "critical":
      return "#d9534f"; // red
  }
};

const severityToRadius = (s: Severity) => {
  switch (s) {
    case "low":
      return 6;
    case "moderate":
      return 10;
    case "high":
      return 14;
    case "critical":
      return 20;
  }
};

function FlyToLocation({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([coords[1], coords[0]], 10, { duration: 0.8 });
  }, [coords, map]);
  return null;
}

export default function InteractiveMap({ incidents = mockIncidents, showSidebar = true }: InteractiveMapFullProps) {
  const [active, setActive] = useState<MapIncident | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<Severity | "all">("all");
  const [showHotspots, setShowHotspots] = useState(true);
  const [clusterEnabled, setClusterEnabled] = useState(true);
  const [flyCoords, setFlyCoords] = useState<[number, number] | null>(null);

  const filtered = useMemo(() => {
    if (filterSeverity === "all") return incidents;
    return incidents.filter((i) => i.severity === filterSeverity);
  }, [incidents, filterSeverity]);

  // Create simple GeoJSON line for Indian coastline visualisation.
  // This is a stylized polyline with a few sample points. For a high fidelity coastline replace with real GeoJSON.
  const coastlineGeoJSON = useMemo(() => {
    return {
      type: "Feature",
      properties: { name: "Indian Coastline (stylized)" },
      geometry: {
        type: "LineString",
        coordinates: [
          [68.0, 23.7], // Gujarat coast start
          [69.5, 21.9],
          [70.8, 20.5],
          [72.8, 19.1],
          [74.8, 17.5],
          [76.0, 15.5],
          [76.7, 13.0],
          [78.1, 11.5],
          [80.3, 10.0],
          [80.9, 9.0],
          [82.8, 9.6],
          [85.0, 19.0],
          [86.5, 21.0],
        ],
      },
    } as GeoJSON.FeatureCollection;
  }, []);

  return (
    <div className="flex gap-4 w-full">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-80 bg-white dark:bg-slate-900 rounded-lg p-3 shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Recent Coastal Hazards</h4>
            <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
          </div>

          <div className="flex gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="flex-1 border rounded px-2 py-1 text-sm"
            >
              <option value="all">All severities</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            <button
              onClick={() => setShowHotspots((s) => !s)}
              className={`px-3 py-1 rounded text-sm border ${showHotspots ? "bg-slate-100" : ""}`}
            >
              Hotspots
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={clusterEnabled} onChange={() => setClusterEnabled((s) => !s)} />
              Cluster
            </label>
          </div>

          <div className="overflow-auto space-y-2 max-h-[60vh]">
            {filtered.map((inc) => (
              <div
                key={inc.id}
                className={`p-2 rounded border cursor-pointer hover:shadow ${active?.id === inc.id ? "bg-slate-50" : "bg-white"}`}
                onClick={() => {
                  setActive(inc);
                  setFlyCoords(inc.location.coordinates);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm">{inc.location.name}</div>
                    <div className="text-xs text-muted-foreground">{inc.type.replace(/-/g, " ")}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{inc.severity.toUpperCase()}</div>
                    <div className="text-xs">{new Date(inc.reportedAt).toLocaleTimeString()}</div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">{inc.description}</div>

                <div className="mt-2 flex gap-2">
                  <button
                    className="px-2 py-1 text-xs border rounded"
                    onClick={() => {
                      setActive(inc);
                      setFlyCoords(inc.location.coordinates);
                    }}
                  >
                    Focus
                  </button>

                  <button
                    className="px-2 py-1 text-xs border rounded"
                    onClick={() => window.alert(`Open report details for ${inc.id}`)}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Map */}
      <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "76vh", width: "100%" }}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite (ESRI)">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* Stylized coastline */}
          <GeoJSON data={coastlineGeoJSON as any} style={{ color: "#2563eb", weight: 3, opacity: 0.7 }} />

          {/* Hotspot pulsing with CircleMarker and CSS animation */}
          {showHotspots &&
            filtered.map((inc) => (
              <CircleMarker
                key={`hot-${inc.id}`}
                center={[inc.location.coordinates[1], inc.location.coordinates[0]]}
                radius={severityToRadius(inc.severity) * 1.8}
                pathOptions={{ color: severityToColor(inc.severity), fillOpacity: 0.12, weight: 0 }}
                interactive={false}
              />
            ))}

          {/* Markers - optional clustering */}
          {clusterEnabled ? (
            <MarkerClusterGroup>
              {filtered.map((inc) => (
                <Marker key={inc.id} position={[inc.location.coordinates[1], inc.location.coordinates[0]]}>
                  <Popup minWidth={200}>
                    <div className="p-1">
                      <div className="font-semibold">{inc.location.name}</div>
                      <div className="text-xs">{inc.type.replace(/-/g, " ")}</div>
                      <div className="text-xs mt-1">{inc.description}</div>
                      <div className="mt-2 text-xs flex gap-2 items-center">
                        <span style={{ background: severityToColor(inc.severity), padding: "2px 6px", borderRadius: 6, color: "white", fontSize: 12 }}>
                          {inc.severity.toUpperCase()}
                        </span>
                        {inc.verified && <span className="text-xs">Verified</span>}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          ) : (
            filtered.map((inc) => (
              <Marker key={inc.id} position={[inc.location.coordinates[1], inc.location.coordinates[0]]}>
                <Popup minWidth={200}>
                  <div className="p-1">
                    <div className="font-semibold">{inc.location.name}</div>
                    <div className="text-xs">{inc.type.replace(/-/g, " ")}</div>
                    <div className="text-xs mt-1">{inc.description}</div>
                    <div className="mt-2 text-xs flex gap-2 items-center">
                      <span style={{ background: severityToColor(inc.severity), padding: "2px 6px", borderRadius: 6, color: "white", fontSize: 12 }}>
                        {inc.severity.toUpperCase()}
                      </span>
                      {inc.verified && <span className="text-xs">Verified</span>}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
          )}

          {/* Highlight active incident and fly-to */}
          {active && <FlyToLocation coords={active.location.coordinates} />}
          {flyCoords && <FlyToLocation coords={flyCoords} />}
        </MapContainer>
      </div>
    </div>
  );
}
