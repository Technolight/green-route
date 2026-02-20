import { Users, Info, Factory, CircleAlert } from "lucide-react";

export default function MethodologyModal() {
  return (
    <div className="p-4 flex flex-col items-center">
      {/* Trigger Button */}
      <button
        className="btn btn-outline btn-warning shadow-lg"
        onClick={() => {
          const modal = document.getElementById(
            "methodology_modal",
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        }}
      >
        <Info />
        Data Sources & Methodology
      </button>

      {/* Modal Structure */}
      <dialog id="methodology_modal" className="modal modal-middle">
        <div className="modal-box w-11/12 max-w-5xl bg-base-100 p-0">
          {/* Header Section */}
          <div className="bg-primary text-primary-content p-6 sticky top-0 z-10">
            <h3 className="font-bold text-2xl mb-1">
              How We Calculate Your Footprint
            </h3>
            <p className="text-sm opacity-90 italic">
              Detailed explanation of our land transport emission factors and
              data logic.
            </p>
          </div>

          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Detailed Explanation Section */}
            <section className="space-y-4">
              <h4 className="font-bold text-xl border-b pb-2">
                Understanding the Math
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-bold text-primary flex items-center gap-2">
                    <Users />
                    The "Occupancy" Effect
                  </h5>
                  <p className="text-sm text-base-content/80 leading-relaxed">
                    Carbon emissions are calculated at the{" "}
                    <strong>vehicle level</strong> first. When you travel in a
                    shared vehicle (like a Jeepney or Bus), the total emissions
                    are divided by the number of passengers. This is why public
                    transport results in a significantly lower personal
                    footprint compared to driving alone in a car.
                  </p>
                </div>
                <div className="space-y-3">
                  <h5 className="font-bold text-primary flex items-center gap-2">
                    <Factory />
                    Fuel & Grid Intensity
                  </h5>
                  <p className="text-sm text-base-content/80 leading-relaxed">
                    Our factors account for the specific fuel type (Diesel vs.
                    Petrol). For Electric Vehicles (EVs), we don't assume "zero
                    emissions." Instead, we use the{" "}
                    <strong>Philippines Grid Emission Factor</strong> (approx.
                    0.691 kg CO₂/kWh), accounting for the coal and gas used to
                    generate the electricity that charges the vehicle.
                  </p>
                </div>
              </div>
            </section>

            {/* Land Transport Table */}
            <section>
              <h4 className="font-bold text-xl border-b pb-2 mb-4">
                Land Transport Emission Factors
              </h4>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xs sm:text-sm">
                  <thead className="bg-base-300">
                    <tr>
                      <th>Transport Mode</th>
                      <th>Vehicle EF (kg CO₂/km)</th>
                      <th>Default Passengers (Typical Load)</th>
                      <th>Context/Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold">Bicycle</td>
                      <td>0</td>
                      <td>1</td>
                      <td>Zero tailpipe emissions.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Tricycle</td>
                      <td>0.0405</td>
                      <td>4</td>
                      <td>Based on 2-stroke engine studies in Metro Manila.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Jeepney (Diesel PUJ)</td>
                      <td>0.300</td>
                      <td>12</td>
                      <td>Classic Public Utility Jeepney average load.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Van / Minibus</td>
                      <td>0.180</td>
                      <td>12</td>
                      <td>Shared shuttle service (UV Express style).</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Bus</td>
                      <td>0.822</td>
                      <td>50</td>
                      <td>Higher vehicle emission, but very low per-person.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Motorcycle ≤125cc</td>
                      <td>0.073</td>
                      <td>1</td>
                      <td>Efficient single-passenger transport.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Car (Petrol)</td>
                      <td>0.178</td>
                      <td>Variable</td>
                      <td>Average sedan/hatchback petrol consumption.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Car (Diesel)</td>
                      <td>0.170</td>
                      <td>Variable</td>
                      <td>
                        Slightly more efficient but higher local pollutants.
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Electric Car</td>
                      <td>0.104</td>
                      <td>Variable</td>
                      <td>Based on 2023 Philippines Energy Mix.</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">SUV / Pickup Truck</td>
                      <td>0.250</td>
                      <td>Variable</td>
                      <td>Heavier chassis and larger engine displacement.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Scientific References Section */}
            <section className="border-t pt-6">
              <h4 className="font-bold text-lg mb-3">
                Scientific References & Sources
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a
                  href="https://ourworldindata.org/travel-carbon-footprint"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <p className="text-xs font-bold uppercase text-primary">
                    Source 1
                  </p>
                  <p className="text-sm">
                    Smallest carbon footprint forms of transport -{" "}
                    <strong>Our World in Data</strong>
                  </p>
                </a>
                <a
                  href="https://www.sciencedirect.com/science/article/abs/pii/S1361920907000624"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <p className="text-xs font-bold uppercase text-primary">
                    Source 2
                  </p>
                  <p className="text-sm">
                    2-stroke tricycles in Metro Manila -{" "}
                    <strong>ScienceDirect</strong>
                  </p>
                </a>
                <a
                  href="https://www.climatiq.io/data/emission-factor/1cdd4e1d-8511-4022-9b33-0d96fd3c1b46"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <p className="text-xs font-bold uppercase text-primary">
                    Source 3
                  </p>
                  <p className="text-sm">
                    Grid Emission Factor: Philippines -{" "}
                    <strong>Climatiq</strong>
                  </p>
                </a>
                <a
                  href="https://www.carbonindependent.org/files/passenger-transport.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <p className="text-xs font-bold uppercase text-primary">
                    Source 4
                  </p>
                  <p className="text-sm">
                    Passenger transport factors -{" "}
                    <strong>Carbon Independent</strong>
                  </p>
                </a>
              </div>
            </section>

            {/* Disclaimer Footer */}
            <div className="alert alert-warning shadow-sm py-3 px-4 rounded-xl flex items-start space-x-2">
              <CircleAlert />
              <div className="text-xs">
                <strong>Disclaimer:</strong> These values are based on
                standardized scientific averages. Your actual footprint may
                differ based on driving habits, traffic congestion, and vehicle
                maintenance levels.
              </div>
            </div>
          </div>
          <div className="modal-action p-4 sticky bottom-0 bg-base-200">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost">Dismiss</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
