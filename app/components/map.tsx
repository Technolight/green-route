"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Coords = [number, number];

interface MapProps {
  route: any | null;
  start?: Coords | null;
  end?: Coords | null;
}

export default function Map({ route, start, end }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const routeLayerRef = useRef<L.Layer | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const endMarkerRef = useRef<L.Marker | null>(null);

  // Custom pin icon
  const pinIcon = L.icon({
    iconUrl: "/map-pin.svg",
    iconSize: [52, 52],
    iconAnchor: [16, 32], // bottom center aligns with coordinate
  });

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    mapRef.current = map;

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Draw route
  useEffect(() => {
    if (!mapRef.current || !route) return;

    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    let layer: L.Layer | null = null;

    if (route.geometry?.type === "LineString") {
      layer = L.geoJSON(route.geometry, {
        style: { color: "green", weight: 5 },
      });
    } else if (Array.isArray(route.geometry?.coordinates)) {
      const latLngs = route.geometry.coordinates
        .filter((c: any) => Array.isArray(c) && c.length === 2)
        .map((c: [number, number]) => [c[1], c[0]]); // [lat, lon]

      if (latLngs.length > 1) {
        layer = L.polyline(latLngs, { color: "green", weight: 5 });
      }
    }

    if (!layer) {
      console.error("Invalid route geometry:", route);
      return;
    }

    layer.addTo(mapRef.current);
    routeLayerRef.current = layer;

    const bounds =
      layer instanceof L.Polyline
        ? layer.getBounds()
        : (layer as any).getBounds?.();

    if (bounds && bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [route]);

  // Add start/end markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove previous markers
    if (startMarkerRef.current) startMarkerRef.current.remove();
    if (endMarkerRef.current) endMarkerRef.current.remove();

    // Add new markers
    if (start) {
      startMarkerRef.current = L.marker([start[0], start[1]], {
        icon: pinIcon,
      }).addTo(mapRef.current);
    }
    if (end) {
      endMarkerRef.current = L.marker([end[0], end[1]], {
        icon: pinIcon,
      }).addTo(mapRef.current);
    }
  }, [start, end]);

  return <div ref={containerRef} className="w-full h-full" />;
}
