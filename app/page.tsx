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
        <div className="w-1/4 flex flex-col h-full">
          <div className="overflow-y-auto flex-1">
            <Sidebar />
          </div>

          <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
              <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
              <a href="https://github.com/Technolight/green-route">
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
                  className="lucide lucide-github-icon lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </RouteProvider>
  );
}
