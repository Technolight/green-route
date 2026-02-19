"use client";
import { useRoute } from "./RouteCreator";

export default function CarbonSummary() {
  const { segments } = useRoute();

  if (!segments.length) return null;

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 space-y-4 mt-4">
      <div className="divider text-lg">Carbon Summary</div>

      {segments.map((segment, i) => {
        const km = (segment.distance / 1000).toFixed(2);

        return (
          <div key={i} className="stat bg-base-300 rounded-box p-3">
            <div className="stat-title">Destination {i + 1} produced</div>
            <div className="stat-value text-secondary">
              {segment.carbon.toFixed(3)} kg CO₂
            </div>
            <div className="stat-desc">
              Travelled {km} km using a {segment.transportMethod}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
