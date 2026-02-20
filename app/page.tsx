import { Github } from "lucide-react";
import { RouteProvider } from "./components/RouteCreator";
import Sidebar from "./components/Sidebar";
import MapWrapper from "./components/MapWrapper";

export const metadata = {
  title: "GreenRoute | Calculate Your Footprint",
  description: "Track and reduce your travel carbon emissions.",
  icons: {
    icon: "/leaf.svg",
  },
};
export default function Home() {
  return (
    <RouteProvider>
      <div className="drawer drawer-end lg:drawer-open h-screen overflow-hidden">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content relative h-full w-full">
          {/* 1. Map Container */}
          <div className="absolute inset-0 z-0">
            <MapWrapper />
          </div>

          {/* 2. Floating Action Button (FAB) */}
          {/* We use z-[9999] to ensure it is above map controls */}
          <div className="absolute bottom-6 right-6 lg:hidden z-9999">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-circle btn-primary h-20 w-20 shadow-lg flex items-center justify-center cursor-pointer pointer-events-auto"
            >
              <span className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-leaf-icon lucide-leaf"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </span>
            </label>
          </div>
        </div>

        {/* 3. Sidebar */}
        <div className="drawer-side z-10000">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar container: flex column to place footer at bottom */}
          <div className="flex flex-col min-h-full w-3/4 md:w-lg max-w-lg bg-base-200">
            {/* Sidebar content */}
            <div className="flex-1 overflow-auto">
              <Sidebar />
            </div>

            {/* Footer always at bottom */}
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
              <aside className="grid-flow-col items-center">
                <p>
                  Copyright © {new Date().getFullYear()} - All rights reserved
                </p>
              </aside>
              <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="https://github.com/Technolight/green-route">
                  <Github />
                </a>
              </nav>
            </footer>
          </div>
        </div>
      </div>
    </RouteProvider>
  );
}
