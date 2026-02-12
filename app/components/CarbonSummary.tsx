"use client";
import { useRoute } from "./RouteCreator";

export default function CarbonSummary() {
  const { transportCO2Factor, distance } = useRoute();

  if (!transportCO2Factor || !distance) return null;

  const distancekm = distance / 1000; // convert to km
  const totalCO2 = transportCO2Factor * distancekm;
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 space-y-4">
      <div className="divider divide-accent text-lg">Summary</div>
      <div className="stat">
        <div className="stat-title">You contributed</div>
        <div className="stat-value">{totalCO2} kg CO₂</div>
        <div className="stat-desc">by travelling {distancekm} kilometers</div>
      </div>
    </fieldset>
  );
}
