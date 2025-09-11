import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Card, CardBody, Button } from "../../components/ui";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const HAMMOND_LA_CENTER: LatLngExpression = [30.5044, -90.4612];
const DEFAULT_ZOOM = 13;

type Address = {
  id: number;
  line1: string;
  city: string;
  state: string;
  geocode_lat?: number | null;
  geocode_lng?: number | null;
};
type Property = {
  id: number;
  display_name: string;
  description?: string;
  addresses?: Address[];
};

async function fetchProperties(): Promise<Property[]> {
  const res = await api.get("/properties/");
  return res.data as Property[];
}

function FitToStops({ points }: { points: LatLngExpression[] }) {
  const map = useMap();
  useMemo(() => {
    if (points.length >= 2) {
      const bounds: LatLngBoundsExpression = points as LatLngBoundsExpression;
      map.fitBounds(bounds, { padding: [40, 40] });
    } else if (points.length === 1) {
      map.setView(points[0], 16);
    }
  }, [map, points]);
  return null;
}

function RecenterButton() {
  const map = useMap();
  return (
    <div
      className="leaflet-top leaflet-right"
      style={{ position: "absolute", right: 12, top: 12, zIndex: 1000 }}
    >
      <button
        onClick={() => map.setView(HAMMOND_LA_CENTER, DEFAULT_ZOOM)}
        className="rounded-lg border bg-white px-3 py-2 text-sm shadow hover:bg-gray-50"
      >
        Recenter to Hammond, LA
      </button>
    </div>
  );
}

export default function WalkingTour() {
  const { data } = useQuery({ queryKey: ["properties"], queryFn: fetchProperties });

  // Build tour stops from geocoded addresses
  const stops = useMemo(() => {
    return (data || [])
      .map((p) => {
        const a = p.addresses?.[0];
        if (!a || a.geocode_lat == null || a.geocode_lng == null) return null;
        return {
          id: p.id,
          title: p.display_name,
          lat: Number(a.geocode_lat),
          lng: Number(a.geocode_lng),
          addr: `${a.line1}, ${a.city} ${a.state}`,
        };
      })
      .filter(Boolean) as { id: number; title: string; lat: number; lng: number; addr: string }[];
  }, [data]);

  const points: LatLngExpression[] = stops.map((s) => [s.lat, s.lng]);
  const center: LatLngExpression = stops.length ? (points[0] as LatLngExpression) : HAMMOND_LA_CENTER;

  return (
    <Card>
      <CardBody>
        <h1 className="text-2xl font-semibold mb-4">Walking Tour – Hammond, Louisiana</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MapContainer
                center={center}
                zoom={DEFAULT_ZOOM}
                style={{ height: 500, width: "100%" }}
              >
                {/* OpenStreetMap standard tiles (free, no key) */}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FitToStops points={points} />
                <RecenterButton />
                {stops.map((s, i) => (
                  <Marker key={s.id} position={[s.lat, s.lng]}>
                    <Popup>
                      <div className="font-medium">{i + 1}. {s.title}</div>
                      <div className="text-sm text-gray-600">{s.addr}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div>
            <ol className="space-y-2 list-decimal list-inside">
              {stops.length === 0 && (
                <div className="text-gray-600">
                  No geocoded properties yet. Add <code>geocode_lat</code> and <code>geocode_lng</code> on an Address to see markers.
                </div>
              )}
              {stops.map((s, i) => (
                <li key={s.id}>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.addr}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
