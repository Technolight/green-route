"use client";
import { useEffect, useState } from "react";
import { useRoute } from "./RouteCreator";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

interface RouteInputProps {
  index: number;
}

export default function RouteInput({ index }: RouteInputProps) {
  const { waypoints, setWaypoints } = useRoute();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!query || selected) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query,
    )}&format=json&limit=5`;

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then(setSuggestions)
      .catch(() => {});

    return () => controller.abort();
  }, [query, selected]);

  const updateWaypoint = (coords: [number, number], displayName: string) => {
    const updated = [...waypoints];
    updated[index] = coords;

    if (index === waypoints.length - 1) {
      updated.push(null);
    }

    setWaypoints(updated);
    setQuery(displayName);
    setSelected(true);
  };
  if (index > 0 && !waypoints[index - 1]) return null;

  return (
    <div className="relative w-full mb-3">
      <input
        className="input input-secondary w-full"
        placeholder={index === 0 ? "Starting Point" : `Destination ${index}`}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(false);
        }}
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-base-200 rounded-box mt-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-base-300"
              onClick={() =>
                updateWaypoint(
                  [parseFloat(s.lat), parseFloat(s.lon)],
                  s.display_name,
                )
              }
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
