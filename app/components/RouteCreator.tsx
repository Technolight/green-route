"use client";
import { createContext, useContext, useState } from "react";

type Coords = [number, number];

interface RouteContextType {
  start: Coords | null;
  end: Coords | null;
  route: any | null;
  transportCO2Factor: number | null;
  distance: number | null;
  setStart: (c: Coords | null) => void;
  setEnd: (c: Coords | null) => void;
  setRoute: (r: any | null) => void;
  settransportCO2Factor: (v: number | null) => void;
  setDistance: (d: number | null) => void;
}

const RouteContext = createContext<RouteContextType | null>(null);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [start, setStart] = useState<Coords | null>(null);
  const [end, setEnd] = useState<Coords | null>(null);
  const [route, setRoute] = useState<any | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [transportCO2Factor, settransportCO2Factor] = useState<number | null>(
    null,
  );

  return (
    <RouteContext.Provider
      value={{
        start,
        end,
        route,
        transportCO2Factor,
        distance,
        setStart,
        setEnd,
        setRoute,
        settransportCO2Factor,
        setDistance,
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
