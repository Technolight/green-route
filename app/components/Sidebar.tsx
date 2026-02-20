"use client";
import { useRoute } from "./RouteCreator";
import RouteInput from "./RouteInput";
import TransportSelect from "./TransportSelect";
import RouteButton from "./RouteButton";
import CarbonSummary from "./CarbonSummary";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const { waypoints } = useRoute();

  return (
    <div className="flex flex-col p-4 w-full overflow-y-auto">
      <h1 className="text-3xl text-primary font-bold mb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/leaf.svg"
            alt="GreenRoute Logo"
            width={24}
            height={24}
            priority
          />
          <span className="font-bold text-xl">GreenRoute</span>
        </div>
      </h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <div className="divider divider-start text-lg">Route</div>
        <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical w-full">
          {waypoints.map((wp, i) => {
            const isActive = wp !== null;

            return (
              <li key={i}>
                {i === 0 ? null : (
                  <hr className={isActive ? "bg-primary" : "bg-neutral"} />
                )}
                <div className="timeline-middle">
                  <MapPin
                    className={`h-8 w-8 ${isActive ? "text-primary" : "text-neutral"}`}
                  />
                </div>
                <div className="timeline-end mb-5 w-full">
                  <RouteInput index={i} />
                  <TransportSelect index={i} />
                </div>
                {i === waypoints.length - 1 ? null : (
                  <hr
                    className={
                      i < waypoints.length - 1 && waypoints[i + 1] !== null
                        ? "bg-primary"
                        : "bg-neutral"
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>

        <RouteButton />
      </fieldset>
      <CarbonSummary />
    </div>
  );
}
