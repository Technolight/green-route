"use client";
import { useEffect, useState } from "react";
import { useRoute } from "./RouteCreator";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

export default function RouteInput({ type }: { type: "start" | "end" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState(false);

  const { setStart, setEnd } = useRoute();

  useEffect(() => {
    if (!query || selected) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query,
      )}&format=json&limit=5`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then(setSuggestions)
      .catch(() => {});

    return () => controller.abort();
  }, [query, selected]);

  return (
    <div className="relative w-full">
      <input
        className="input input-secondary w-full"
        placeholder={type === "start" ? "Starting Point" : "Destination"}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(false);
          if (type === "start") setStart(null);
          else setEnd(null);
        }}
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-base-200 rounded-box mt-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-base-300"
              onClick={() => {
                const coords: [number, number] = [
                  parseFloat(s.lat),
                  parseFloat(s.lon),
                ];

                if (type === "start") setStart(coords);
                else setEnd(coords);

                setQuery(s.display_name);
                setSuggestions([]);
                setSelected(true);
              }}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
