"use client";
import { useRoute } from "./RouteCreator";
import TransportSelect from "./TransportSelect";

export default function RouteButton() {
  const { start, end, setRoute, setDistance } = useRoute();

  const handleRoute = async () => {
    if (!start || !end) {
      alert("Please select both a start and destination");
      return;
    }

    try {
      const res = await fetch("/api/directions/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start,
          end,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("API error response:", error);
        throw new Error(error);
      }

      const data = await res.json();
      setRoute(data);
      setDistance(data.summary.distance);
    } catch (err) {
      console.error(err);
      alert("Failed to calculate route");
    }
  };

  return (
    <button onClick={handleRoute} className="btn btn-neutral w-full mt-4">
      Calculate Carbon Emissions
    </button>
  );
}
