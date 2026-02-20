"use client";

import { useMemo } from "react";
import { useRoute } from "./RouteCreator";
import MethodologyModal from "./MethodologyModal";

export default function CarbonSummary() {
  const { segments } = useRoute();

  if (!segments.length) return null;

  const totals = useMemo(() => {
    return segments.reduce(
      (acc, segment) => {
        const km = segment.distance / 1000;
        acc.totalDistance += km;
        acc.totalCarbon += segment.carbon;
        return acc;
      },
      { totalDistance: 0, totalCarbon: 0 },
    );
  }, [segments]);

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 space-y-4 mt-4">
      <div className="divider divider-start text-lg">Environmental Impact</div>
      <label className="label">Based on current settings</label>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Total Distance</div>
          <div className="stat-value text-2xl">
            {totals.totalDistance.toFixed(2)} km
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Carbon Footprint</div>
          <div className="stat-value text-2xl text-secondary">
            {totals.totalCarbon.toFixed(3)} kg CO₂
          </div>
        </div>
      </div>

      <label className="label">Detailed Breakdown</label>
      {segments.map((segment, i) => {
        const km = segment.distance / 1000;

        return (
          <div key={i} className="stat bg-base-300 rounded-box p-3">
            <div className="stat-title">
              Reaching Destination {i + 1} produced
            </div>

            <div className="stat-value text-2xl">
              {segment.carbon.toFixed(3)} kg CO₂
            </div>

            <div className="stat-desc">
              Travelled {km.toFixed(2)} km using a {segment.transportMethod}
            </div>
          </div>
        );
      })}
      <MethodologyModal />
    </fieldset>
  );
}
