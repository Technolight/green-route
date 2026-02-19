import { RouteProvider } from "./components/RouteCreator";
import Sidebar from "./components/Sidebar";
import MapWrapper from "./components/MapWrapper";

export default function Home() {
  return (
    <RouteProvider>
      <div className="flex h-screen w-screen">
        <div className="w-3/4 h-full">
          <MapWrapper />
        </div>
        <Sidebar />
      </div>
    </RouteProvider>
  );
}
