"use client";
import { useRoute } from "./RouteCreator";

export default function RouteButton() {
  const { waypoints, transportSelections, setSegments } = useRoute();

  const handleRoute = async () => {
    const validWaypoints = waypoints.filter(
      (w): w is [number, number] => w !== null,
    );

    if (validWaypoints.length < 2) {
      alert("Need at least 2 waypoints");
      return;
    }

    const newSegments = [];

    for (let i = 0; i < validWaypoints.length - 1; i++) {
      const from = validWaypoints[i];
      const to = validWaypoints[i + 1];

      const transport = transportSelections[i];

      if (!transport) {
        alert(`Please select transport for segment ${i + 1}`);
        return;
      }

      const res = await fetch("/api/directions/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waypoints: [from, to] }),
      });

      if (!res.ok) {
        alert("Failed to fetch route segment");
        return;
      }

      const data = await res.json();

      const distance = data.summary.distance;
      const geometry = data.geometry;

      const distanceKm = distance / 1000;
      const carbon = distanceKm * transport.factor;

      newSegments.push({
        from,
        to,
        distance,
        transportFactor: transport.factor,
        transportMethod: transport.method,
        carbon,
        geometry, // ✅ FIXED
      });
    }

    setSegments(newSegments);
  };

  return (
    <button onClick={handleRoute} className="btn btn-neutral w-full mt-4">
      Calculate Carbon Emissions
    </button>
  );
}
