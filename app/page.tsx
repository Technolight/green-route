import TransportSelect from "./components/TransportSelect";
import RouteInput from "./components/RouteInput";
import RouteButton from "./components/RouteButton";
import MapWrapper from "./components/MapWrapper";
import { RouteProvider } from "./components/RouteCreator";
import CarbonSummary from "./components/CarbonSummary";

export default function Home() {
  return (
    <RouteProvider>
      <div className="flex h-screen w-screen">
        {/* Map */}
        <div className="w-3/4 h-full">
          <MapWrapper />
        </div>

        {/* Sidebar */}
        <div className="w-1/4 h-full flex flex-col gap-4 p-4 overflow-y-auto">
          <h1 className="text-3xl text-primary font-bold mb-4">Green Route</h1>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 space-y-4">
            <div className="divider divide-accent text-lg">Route</div>
            <RouteInput type="start" />
            <RouteInput type="end" />

            <div className="divider divide-accent text-lg">
              Mode of Transport
            </div>
            <TransportSelect />

            <RouteButton />
          </fieldset>
          <CarbonSummary />
        </div>
      </div>
    </RouteProvider>
  );
}
