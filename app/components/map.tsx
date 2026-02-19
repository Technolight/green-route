"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRoute } from "./RouteCreator";

export default function Map() {
  const { segments, waypoints } = useRoute();

  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const segmentLayersRef = useRef<L.LayerGroup | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  const pinIcon = L.icon({
    iconUrl: "/map-pin.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([14.5995, 120.9842], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    segmentLayersRef.current = L.layerGroup().addTo(map);
    markerLayerRef.current = L.layerGroup().addTo(map);

    mapRef.current = map;

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Draw segments
  useEffect(() => {
    if (!mapRef.current || !segmentLayersRef.current) return;

    segmentLayersRef.current.clearLayers();

    const allBounds: L.LatLng[] = [];

    segments.forEach((segment) => {
      const { from, to } = segment;

      if (segment.geometry?.type === "LineString") {
        const geoLayer = L.geoJSON(segment.geometry, {
          style: { color: "green", weight: 5 },
        });

        geoLayer.addTo(segmentLayersRef.current!);
      }

      allBounds.push(L.latLng(from[0], from[1]), L.latLng(to[0], to[1]));
    });

    if (allBounds.length > 0) {
      const bounds = L.latLngBounds(allBounds);
      mapRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [segments]);

  // Draw waypoint markers
  useEffect(() => {
    if (!mapRef.current || !markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();

    waypoints.forEach((w) => {
      if (!w) return;

      L.marker([w[0], w[1]], {
        icon: pinIcon,
      }).addTo(markerLayerRef.current!);
    });
  }, [waypoints]);

  return <div ref={containerRef} className="w-full h-full" />;
}
