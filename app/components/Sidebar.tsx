"use client";
import { useRoute } from "./RouteCreator";
import RouteInput from "./RouteInput";
import TransportSelect from "./TransportSelect";
import RouteButton from "./RouteButton";
import CarbonSummary from "./CarbonSummary";

export default function Sidebar() {
  const { waypoints } = useRoute();

  return (
    <div className="w-1/4 h-full flex flex-col p-4 overflow-y-auto">
      <h1 className="text-3xl text-primary font-bold mb-4">Green Route</h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <div className="divider divide-accent text-lg">Route</div>
        {waypoints.map((_, i) => (
          <div key={i} className="">
            <RouteInput index={i} />
            {i < waypoints.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="border-l-2 border-neutral border-dashed h-10" />
              </div>
            )}
            <TransportSelect index={i} />
            {i < waypoints.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="border-l-2 border-neutral border-dashed h-10" />
              </div>
            )}
          </div>
        ))}

        <RouteButton />
      </fieldset>
      <CarbonSummary />
    </div>
  );
}
