"use client";

import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";

export interface MemberLocation {
  country: string;
  city: string;
  members: number;
  lat: number;
  lon: number;
  featured?: boolean;
}

interface MembersWorldMapProps {
  locations: MemberLocation[];
}

const INITIAL_CENTER: LatLngExpression = [20, 5];
const WORLD_BOUNDS: LatLngBoundsExpression = [[-85, -180], [85, 180]];

export default function MembersWorldMap({ locations }: MembersWorldMapProps) {
  const primaryHub = locations.find((location) => location.featured) ?? locations[0];

  return (
    <MapContainer
      center={INITIAL_CENTER}
      zoom={2}
      minZoom={2}
      maxZoom={8}
      zoomControl={false}
      scrollWheelZoom
      maxBounds={WORLD_BOUNDS}
      maxBoundsViscosity={0.8}
      worldCopyJump
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {primaryHub &&
        locations
          .filter(
            (location) =>
              location.country !== primaryHub.country || location.city !== primaryHub.city,
          )
          .map((location, index) => (
            <Polyline
              key={`line-${location.country}-${location.city}-${index}`}
              positions={[
                [primaryHub.lat, primaryHub.lon],
                [location.lat, location.lon],
              ]}
              pathOptions={{
                color: "var(--brand-green)",
                weight: 1.5,
                opacity: 0.45,
                dashArray: "4 4",
              }}
            />
          ))}

      {locations.map((location, index) => (
        <CircleMarker
          key={`${location.country}-${location.city}-${index}`}
          center={[location.lat, location.lon]}
          radius={location.featured ? 8 : 6}
          pathOptions={{
            color: "#ffffff",
            weight: 1.5,
            fillColor: "var(--brand-green)",
            fillOpacity: location.featured ? 0.95 : 0.8,
          }}
        >
          {location.featured && (
            <Tooltip direction="top" offset={[0, -8]} permanent>
              {location.country}
            </Tooltip>
          )}

          <Popup>
            <div className="min-w-36 text-sm">
              <p className="font-bold text-slate-900">{location.country}</p>
              <p className="text-slate-600">{location.city}</p>
              <p className="mt-1 text-brand-green-hover font-semibold">
                {location.members} membres
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
