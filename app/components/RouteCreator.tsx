"use client";
import { createContext, useContext, useState } from "react";

type Coords = [number, number];
type Waypoint = Coords | null;

export type TransportSelection = {
  factor: number;
  method: string;
} | null;

export interface Segment {
  from: Coords;
  to: Coords;
  distance: number; // meters
  transportMethod: string;
  transportFactor: number; // kg per km
  carbon: number; // kg
  geometry: any;
}

interface RouteContextType {
  waypoints: Waypoint[];
  transportSelections: TransportSelection[];
  segments: Segment[];

  setWaypoints: (w: Waypoint[]) => void;
  setTransportSelections: (t: TransportSelection[]) => void;
  setSegments: (s: Segment[]) => void;
}

const RouteContext = createContext<RouteContextType | null>(null);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([null]);

  const [transportSelections, setTransportSelections] = useState<
    TransportSelection[]
  >([]);

  const [segments, setSegments] = useState<Segment[]>([]);

  return (
    <RouteContext.Provider
      value={{
        waypoints,
        transportSelections,
        segments,
        setWaypoints,
        setTransportSelections,
        setSegments,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used inside RouteProvider");
  return ctx;
}
