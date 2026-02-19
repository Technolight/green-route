"use client";
import dynamic from "next/dynamic";
import { useRoute } from "./RouteCreator";

const Map = dynamic(() => import("./map"), { ssr: false });
type Route = {
  geometry: GeoJSON.LineString;
};

type MapWrapperProps = {
  center: [number, number];
  route?: Route;
};

export default function MapWrapper() {
  const { route, waypoints } = useRoute();
  return (
    <Map
      route={route}
      start={waypoints[0]}
      end={waypoints[waypoints.length - 1]}
    />
  );
}
